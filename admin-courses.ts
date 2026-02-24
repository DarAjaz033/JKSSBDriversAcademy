import { onAuthChange } from './auth-service';
import { isAdmin, getCourses, createCourse, updateCourse, updateCourseRank, deleteCourse, Course } from './admin-service';

class AdminCoursesPage {
  private form: HTMLFormElement;
  private submitBtn: HTMLButtonElement;
  private cancelBtn: HTMLButtonElement;
  private coursesContainer: HTMLElement;
  private successMessage: HTMLElement;
  private editingCourseId: string | null = null;
  private coursesList: Course[] = [];

  private categorySelect: HTMLSelectElement;
  private newCategoryInput: HTMLInputElement;
  private descriptionPointsContainer: HTMLElement;
  private addPointBtn: HTMLButtonElement;

  constructor() {
    this.form = document.getElementById('course-form') as HTMLFormElement;
    this.submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    this.cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement;
    this.coursesContainer = document.getElementById('courses-container') as HTMLElement;
    this.successMessage = document.getElementById('success-message') as HTMLElement;
    this.categorySelect = document.getElementById('category') as HTMLSelectElement;
    this.newCategoryInput = document.getElementById('new-category') as HTMLInputElement;
    this.descriptionPointsContainer = document.getElementById('description-points-container') as HTMLElement;
    this.addPointBtn = document.getElementById('add-point-btn') as HTMLButtonElement;
    this.init();
  }

  private async init(): Promise<void> {
    onAuthChange(async (user) => {
      if (!user || !isAdmin(user.email)) {
        window.location.href = './admin-login.html';
        return;
      }

      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.cancelBtn.addEventListener('click', () => this.cancelEdit());
      this.categorySelect.addEventListener('change', () => this.toggleNewCategoryInput());
      this.addPointBtn.addEventListener('click', () => this.addDescriptionPoint());
      this.ensureDescriptionPoints();
      await this.loadCourses();
    });
  }

  private buildDescriptionFromForm(): string {
    const heading = (document.getElementById('description-heading') as HTMLInputElement).value.trim();
    const inputs = this.descriptionPointsContainer.querySelectorAll<HTMLInputElement>('.description-point-input');
    const lines = Array.from(inputs)
      .map(inp => inp.value.trim())
      .filter(Boolean);
    if (lines.length === 0 && !heading) {
      this.addPointBtn.focus();
      throw new Error('Please add at least a description heading or one point');
    }
    const numberedLines = lines.map((l, i) => `${i + 1}. ${l}`);
    const combined = heading ? [heading, ...numberedLines].join(' ') : numberedLines.join(' ');
    return combined;
  }

  private ensureDescriptionPoints(): void {
    if (this.descriptionPointsContainer.children.length === 0) {
      this.addDescriptionPoint('', false);
    }
  }

  private addDescriptionPoint(value: string = '', focusInput: boolean = true): void {
    const index = this.descriptionPointsContainer.children.length + 1;
    const row = document.createElement('div');
    row.className = 'description-point-row';
    const numSpan = document.createElement('span');
    numSpan.className = 'point-number';
    numSpan.textContent = `${index}.`;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-input description-point-input';
    input.placeholder = 'e.g., Identification of major assemblies of vehicle';
    input.value = value;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-icon remove-point-btn delete';
    removeBtn.title = 'Remove point';
    removeBtn.style.flexShrink = '0';
    removeBtn.innerHTML = '<i data-lucide="trash-2" width="14" height="14"></i>';
    removeBtn.addEventListener('click', () => {
      row.remove();
      this.updatePointNumbers();
    });
    row.append(numSpan, input, removeBtn);
    this.descriptionPointsContainer.appendChild(row);
    (window as any).lucide?.createIcons();
    if (focusInput) input.focus();
  }

  private updatePointNumbers(): void {
    this.descriptionPointsContainer.querySelectorAll('.description-point-row').forEach((row, i) => {
      const numSpan = row.querySelector('.point-number');
      if (numSpan) numSpan.textContent = `${i + 1}.`;
    });
  }

  private parseDescriptionToForm(description: string): void {
    const trimmed = description.trim();
    const segments = trimmed.split(/\s*\d+\.\s+/).map(s => s.trim()).filter(Boolean);
    const headingEl = document.getElementById('description-heading') as HTMLInputElement;
    this.descriptionPointsContainer.innerHTML = '';
    if (segments.length > 1) {
      headingEl.value = segments[0];
      segments.slice(1).forEach(point => this.addDescriptionPoint(point, false));
    } else {
      headingEl.value = '';
      if (trimmed) this.addDescriptionPoint(trimmed, false);
      else this.ensureDescriptionPoints();
    }
  }

  private getSelectedCategory(): string {
    const value = this.categorySelect.value;
    if (value === '__new__') {
      const newCat = this.newCategoryInput.value.trim();
      if (!newCat) {
        this.newCategoryInput.focus();
        throw new Error('Please enter the new category name');
      }
      return newCat;
    }
    if (!value) {
      this.categorySelect.focus();
      throw new Error('Please select or create a category');
    }
    return value;
  }

  private toggleNewCategoryInput(): void {
    const isNew = this.categorySelect.value === '__new__';
    this.newCategoryInput.style.display = isNew ? 'block' : 'none';
    this.newCategoryInput.required = isNew;
    this.newCategoryInput.value = '';
    if (isNew) this.newCategoryInput.focus();
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    let category: string;
    let description: string;
    try {
      category = this.getSelectedCategory();
      description = this.buildDescriptionFromForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Please fill in all required fields');
      return;
    }

    const courseData = {
      title: (document.getElementById('title') as HTMLInputElement).value,
      description,
      price: parseInt((document.getElementById('price') as HTMLInputElement).value),
      duration: (document.getElementById('duration') as HTMLInputElement).value,
      category,
      pdfIds: [],
      practiceTestIds: []
    };

    this.submitBtn.disabled = true;
    this.submitBtn.textContent = this.editingCourseId ? 'Updating...' : 'Creating...';

    let result;
    if (this.editingCourseId) {
      result = await updateCourse(this.editingCourseId, courseData);
    } else {
      result = await createCourse(courseData);
    }

    if (result.success) {
      this.showSuccess(this.editingCourseId ? 'Course updated successfully!' : 'Course created successfully!');
      this.form.reset();
      this.cancelEdit();
      await this.loadCourses();
    } else {
      alert('Error: ' + result.error);
    }

    this.submitBtn.disabled = false;
    this.submitBtn.textContent = 'Create Course';
  }

  private async loadCourses(): Promise<void> {
    const result = await getCourses();

    if (result.success && result.courses) {
      this.coursesList = result.courses;
      this.populateCategoryOptions(result.courses);
      this.coursesContainer.innerHTML = result.courses
        .map((course, index) => this.renderCourseItem(course, index))
        .join('');
      this.attachEventListeners();
    } else {
      this.coursesContainer.innerHTML = '<p>No courses found</p>';
    }
  }

  private populateCategoryOptions(courses: Course[]): void {
    const select = this.categorySelect;
    const existingValues = new Set(Array.from(select.options).map(o => o.value));

    courses.forEach(c => {
      if (c.category && c.category !== '__new__' && !existingValues.has(c.category)) {
        existingValues.add(c.category);
        const opt = document.createElement('option');
        opt.value = c.category;
        opt.textContent = c.category;
        select.insertBefore(opt, select.lastElementChild);
      }
    });
  }

  private renderCourseItem(course: Course, index: number): string {
    const rank = index + 1;
    const canMoveUp = index > 0;
    const canMoveDown = index < this.coursesList.length - 1;
    return `
      <div class="course-item" data-id="${course.id}">
        <div class="course-rank" style="display: flex; align-items: center; gap: 8px; margin-right: 12px;">
          <span class="rank-badge" style="min-width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; background: var(--gradient-primary); color: white; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700;">#${rank}</span>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <button type="button" class="btn-icon move-up-btn" data-id="${course.id}" data-index="${index}" ${!canMoveUp ? 'disabled' : ''} title="Move up">
              <i data-lucide="chevron-up" width="16" height="16"></i>
            </button>
            <button type="button" class="btn-icon move-down-btn" data-id="${course.id}" data-index="${index}" ${!canMoveDown ? 'disabled' : ''} title="Move down">
              <i data-lucide="chevron-down" width="16" height="16"></i>
            </button>
          </div>
        </div>
        <div style="flex: 1;">
          <div class="course-item-header">
            <div class="course-title">${course.title}</div>
            <div class="course-actions">
              <button class="btn-icon edit-btn" data-id="${course.id}">
                <i data-lucide="edit-2" width="16" height="16"></i>
              </button>
              <button class="btn-icon delete delete-btn" data-id="${course.id}">
                <i data-lucide="trash-2" width="16" height="16"></i>
              </button>
            </div>
          </div>
          <div class="course-description">${course.description}</div>
          <div class="course-meta">
            <span>₹${course.price}</span>
            <span>•</span>
            <span>${course.duration}</span>
            <span>•</span>
            <span>${course.category}</span>
          </div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    (window as any).lucide.createIcons();

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) this.editCourse(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) this.deleteCourse(id);
      });
    });

    document.querySelectorAll('.move-up-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0', 10);
        this.moveCourse(index, -1);
      });
    });

    document.querySelectorAll('.move-down-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0', 10);
        this.moveCourse(index, 1);
      });
    });
  }

  private async moveCourse(currentIndex: number, direction: number): Promise<void> {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= this.coursesList.length) return;

    const current = this.coursesList[currentIndex];
    const target = this.coursesList[targetIndex];
    if (!current?.id || !target?.id) return;

    const unrankedBase = 1000;
    const currentRank = typeof current.rank === 'number' ? current.rank : unrankedBase + currentIndex;
    const targetRank = typeof target.rank === 'number' ? target.rank : unrankedBase + targetIndex;

    const r1 = await updateCourseRank(current.id, targetRank);
    const r2 = await updateCourseRank(target.id, currentRank);

    if (r1.success && r2.success) {
      this.showSuccess('Course order updated!');
      await this.loadCourses();
    } else {
      alert('Error updating order: ' + (r1.error || r2.error));
    }
  }

  private async editCourse(courseId: string): Promise<void> {
    const result = await getCourses();
    if (result.success && result.courses) {
      const course = result.courses.find(c => c.id === courseId);
      if (course) {
        this.editingCourseId = courseId;
        (document.getElementById('title') as HTMLInputElement).value = course.title;
        this.parseDescriptionToForm(course.description);
        (document.getElementById('price') as HTMLInputElement).value = course.price.toString();
        (document.getElementById('duration') as HTMLInputElement).value = course.duration;

        const categoryOpt = Array.from(this.categorySelect.options).find(o => o.value === course.category);
        if (categoryOpt !== undefined) {
          this.categorySelect.value = course.category;
          this.newCategoryInput.style.display = 'none';
          this.newCategoryInput.value = '';
        } else {
          this.categorySelect.value = '__new__';
          this.newCategoryInput.style.display = 'block';
          this.newCategoryInput.value = course.category;
        }

        this.submitBtn.textContent = 'Update Course';
        this.cancelBtn.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  private cancelEdit(): void {
    this.editingCourseId = null;
    this.form.reset();
    (document.getElementById('description-heading') as HTMLInputElement).value = '';
    this.descriptionPointsContainer.innerHTML = '';
    this.ensureDescriptionPoints();
    this.newCategoryInput.style.display = 'none';
    this.newCategoryInput.value = '';
    this.submitBtn.textContent = 'Create Course';
    this.cancelBtn.style.display = 'none';
  }

  private async deleteCourse(courseId: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    const result = await deleteCourse(courseId);
    if (result.success) {
      this.showSuccess('Course deleted successfully!');
      await this.loadCourses();
    } else {
      alert('Error: ' + result.error);
    }
  }

  private showSuccess(message: string): void {
    this.successMessage.textContent = message;
    this.successMessage.classList.add('show');
    setTimeout(() => {
      this.successMessage.classList.remove('show');
    }, 3000);
  }
}

new AdminCoursesPage();
