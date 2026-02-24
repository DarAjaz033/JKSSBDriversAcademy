import { onAuthChange } from './auth-service';
import { isAdmin, uploadPDF, getPDFs, deletePDF, getCourses, updateCourse, getCourse, PDF } from './admin-service';

class AdminPDFsPage {
  private uploadArea: HTMLElement;
  private fileInput: HTMLInputElement;
  private progressBar: HTMLElement;
  private progressFill: HTMLElement;
  private pdfsContainer: HTMLElement;
  private pdfSelect: HTMLSelectElement;
  private courseSelect: HTMLSelectElement;
  private linkBtn: HTMLButtonElement;

  constructor() {
    this.uploadArea = document.getElementById('upload-area') as HTMLElement;
    this.fileInput = document.getElementById('file-input') as HTMLInputElement;
    this.progressBar = document.getElementById('progress-bar') as HTMLElement;
    this.progressFill = document.getElementById('progress-fill') as HTMLElement;
    this.pdfsContainer = document.getElementById('pdfs-container') as HTMLElement;
    this.pdfSelect = document.getElementById('pdf-select') as HTMLSelectElement;
    this.courseSelect = document.getElementById('course-select') as HTMLSelectElement;
    this.linkBtn = document.getElementById('link-btn') as HTMLButtonElement;
    this.init();
  }

  private async init(): Promise<void> {
    onAuthChange(async (user) => {
      if (!user || !isAdmin(user.email)) {
        window.location.href = './admin-login.html';
        return;
      }

      await this.setupEventListeners();
    });
  }

  private async setupEventListeners(): Promise<void> {
    this.setupUploadArea();
    this.linkBtn.addEventListener('click', () => this.linkPDFToCourse());
    await this.loadPDFs();
    await this.loadCourses();
  }

  private setupUploadArea(): void {
    this.uploadArea.addEventListener('click', () => this.fileInput.click());
    this.fileInput.addEventListener('change', () => this.handleFileSelect());

    this.uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.uploadArea.classList.add('dragover');
    });

    this.uploadArea.addEventListener('dragleave', () => {
      this.uploadArea.classList.remove('dragover');
    });

    this.uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      this.uploadArea.classList.remove('dragover');
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        this.fileInput.files = files;
        this.handleFileSelect();
      }
    });
  }

  private async handleFileSelect(): Promise<void> {
    const file = this.fileInput.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    this.progressBar.classList.add('show');
    this.progressFill.style.width = '0%';

    const simulateProgress = setInterval(() => {
      const currentWidth = parseInt(this.progressFill.style.width);
      if (currentWidth < 90) {
        this.progressFill.style.width = `${currentWidth + 10}%`;
      }
    }, 200);

    const result = await uploadPDF(file);

    clearInterval(simulateProgress);
    this.progressFill.style.width = '100%';

    setTimeout(() => {
      this.progressBar.classList.remove('show');
      this.progressFill.style.width = '0%';
    }, 500);

    if (result.success) {
      alert('PDF uploaded successfully!');
      this.fileInput.value = '';
      await this.loadPDFs();
    } else {
      alert('Error: ' + result.error);
    }
  }

  private async loadPDFs(): Promise<void> {
    const result = await getPDFs();

    if (result.success && result.pdfs) {
      this.pdfsContainer.innerHTML = result.pdfs.map(pdf => this.renderPDFItem(pdf)).join('');
      this.attachEventListeners();

      this.pdfSelect.innerHTML = '<option value="">Select a PDF</option>' +
        result.pdfs.map(pdf => `<option value="${pdf.id}">${pdf.name}</option>`).join('');
    } else {
      this.pdfsContainer.innerHTML = '<p>No PDFs found</p>';
    }
  }

  private renderPDFItem(pdf: PDF): string {
    const sizeInMB = (pdf.size / (1024 * 1024)).toFixed(2);
    return `
      <div class="pdf-item">
        <div class="pdf-info">
          <div class="pdf-icon">
            <i data-lucide="file-text" width="24" height="24"></i>
          </div>
          <div class="pdf-details">
            <div class="pdf-name">${pdf.name}</div>
            <div class="pdf-size">${sizeInMB} MB</div>
          </div>
        </div>
        <div class="pdf-actions">
          <a href="${pdf.url}" target="_blank" class="btn-icon" title="View PDF">
            <i data-lucide="external-link" width="16" height="16"></i>
          </a>
          <button class="btn-icon delete delete-btn" data-id="${pdf.id}" data-url="${pdf.url}">
            <i data-lucide="trash-2" width="16" height="16"></i>
          </button>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    (window as any).lucide.createIcons();

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const url = (e.currentTarget as HTMLElement).getAttribute('data-url');
        if (id && url) this.deletePDF(id, url);
      });
    });
  }

  private async deletePDF(pdfId: string, url: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this PDF?')) {
      return;
    }

    const result = await deletePDF(pdfId, url);
    if (result.success) {
      alert('PDF deleted successfully!');
      await this.loadPDFs();
    } else {
      alert('Error: ' + result.error);
    }
  }

  private async loadCourses(): Promise<void> {
    const result = await getCourses();
    if (result.success && result.courses) {
      this.courseSelect.innerHTML = '<option value="">Select a course</option>' +
        result.courses.map(course => `<option value="${course.id}">${course.title}</option>`).join('');
    }
  }

  private async linkPDFToCourse(): Promise<void> {
    const pdfId = this.pdfSelect.value;
    const courseId = this.courseSelect.value;

    if (!pdfId || !courseId) {
      alert('Please select both a PDF and a course');
      return;
    }

    const courseResult = await getCourse(courseId);
    if (!courseResult.success || !courseResult.course) {
      alert('Failed to load course data');
      return;
    }

    const course = courseResult.course;
    if (!course.pdfIds.includes(pdfId)) {
      course.pdfIds.push(pdfId);
      const updateResult = await updateCourse(courseId, { pdfIds: course.pdfIds });

      if (updateResult.success) {
        alert('PDF linked to course successfully!');
        this.pdfSelect.value = '';
        this.courseSelect.value = '';
      } else {
        alert('Error: ' + updateResult.error);
      }
    } else {
      alert('This PDF is already linked to the selected course');
    }
  }
}

new AdminPDFsPage();
