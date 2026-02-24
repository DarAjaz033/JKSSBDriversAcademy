import * as XLSX from 'xlsx';
import { Question } from './admin-service';

export interface ExcelQuestion {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: number;
  explanation?: string;
}

export const parseExcelFile = async (file: File): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

        const questions: Question[] = jsonData.map((row) => {
          const question = row['Question'] || row['question'] || '';
          const option1 = row['Option 1'] || row['option1'] || '';
          const option2 = row['Option 2'] || row['option2'] || '';
          const option3 = row['Option 3'] || row['option3'] || '';
          const option4 = row['Option 4'] || row['option4'] || '';
          const correctAnswer = parseInt(row['Correct Answer'] || row['correctAnswer'] || '1') - 1;
          const explanation = row['Explanation'] || row['explanation'] || '';

          return {
            question,
            options: [option1, option2, option3, option4],
            correctAnswer,
            explanation
          };
        });

        resolve(questions);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
};

export const downloadExcelTemplate = () => {
  const template = [
    {
      'Question': 'What is the capital of India?',
      'Option 1': 'Mumbai',
      'Option 2': 'Delhi',
      'Option 3': 'Kolkata',
      'Option 4': 'Chennai',
      'Correct Answer': 2,
      'Explanation': 'Delhi is the capital of India'
    },
    {
      'Question': 'What is 2 + 2?',
      'Option 1': '3',
      'Option 2': '4',
      'Option 3': '5',
      'Option 4': '6',
      'Correct Answer': 2,
      'Explanation': '2 + 2 equals 4'
    }
  ];

  const ws = XLSX.utils.json_to_sheet(template);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Questions');
  XLSX.writeFile(wb, 'practice_test_template.xlsx');
};
