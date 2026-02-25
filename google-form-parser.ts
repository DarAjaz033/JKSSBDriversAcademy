import { Question } from './admin-service';

/**
 * Parses a Google Forms JSON export into the shared Question[] format.
 *
 * Google Forms quiz exports (via Forms API or quiz-export tools) typically look like:
 * {
 *   "items": [
 *     {
 *       "title": "What is 2+2?",
 *       "questionItem": {
 *         "question": {
 *           "choiceQuestion": {
 *             "options": [{"value": "3"}, {"value": "4"}, {"value": "5"}, {"value": "6"}]
 *           },
 *           "grading": {
 *             "correctAnswers": { "answers": [{"value": "4"}] },
 *             "generalFeedback": { "text": "2+2=4" }
 *           }
 *         }
 *       }
 *     }
 *   ]
 * }
 *
 * We also handle a simpler flat array format:
 * [{ "question": "...", "options": ["A","B","C","D"], "correctAnswer": 1 }, ...]
 */
export const parseGoogleFormFile = async (file: File): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                const questions = normalizeGoogleFormData(data);
                if (questions.length === 0) {
                    reject(new Error('No valid questions found in the JSON file.'));
                } else {
                    resolve(questions);
                }
            } catch (err) {
                reject(new Error('Failed to parse JSON file. Please ensure it is a valid Google Form export.'));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
};

function normalizeGoogleFormData(data: any): Question[] {
    // Format 1: Simple flat array [{ question, options[], correctAnswer, explanation? }]
    if (Array.isArray(data)) {
        return data
            .map((item: any): Question | null => {
                const question = item.question || item.Question || '';
                const options: string[] = Array.isArray(item.options)
                    ? item.options.map(String)
                    : [item.option1 || '', item.option2 || '', item.option3 || '', item.option4 || ''];
                const correctAnswer = typeof item.correctAnswer === 'number'
                    ? item.correctAnswer
                    : parseInt(item.correctAnswer ?? '1') - 1;
                const explanation = item.explanation || item.Explanation || '';
                if (!question || options.filter(Boolean).length < 2) return null;
                return { question, options, correctAnswer, explanation };
            })
            .filter(Boolean) as Question[];
    }

    // Format 2: Google Forms API export { items: [...] }
    const items: any[] = data?.items ?? data?.form?.items ?? [];
    return items
        .map((item: any): Question | null => {
            const questionItem = item?.questionItem;
            if (!questionItem) return null;

            const title: string = item.title || '';
            const choiceQ = questionItem?.question?.choiceQuestion;
            if (!choiceQ) return null;

            const options: string[] = (choiceQ.options ?? []).map((o: any) =>
                typeof o === 'string' ? o : (o.value ?? o.label ?? '')
            );

            // Try to determine correct answer from grading info
            const grading = questionItem?.question?.grading;
            const correctAnswerValues: string[] =
                grading?.correctAnswers?.answers?.map((a: any) => a.value ?? a.answer ?? '') ?? [];

            let correctAnswer = 0;
            if (correctAnswerValues.length > 0) {
                const idx = options.findIndex(
                    (opt) => correctAnswerValues.includes(opt)
                );
                correctAnswer = idx >= 0 ? idx : 0;
            }

            const explanation: string =
                grading?.generalFeedback?.text ?? grading?.whenRight?.text ?? '';

            if (!title || options.filter(Boolean).length < 2) return null;
            return { question: title, options, correctAnswer, explanation };
        })
        .filter(Boolean) as Question[];
}

/**
 * Downloads a sample Google Form JSON template so admins know the expected format.
 */
export const downloadGoogleFormTemplate = () => {
    const template = [
        {
            question: 'What is the capital of India?',
            options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
            correctAnswer: 1,
            explanation: 'Delhi (New Delhi) has been the capital since 1911.'
        },
        {
            question: 'How many cylinders does a standard 4-stroke engine have?',
            options: ['2', '4', '6', '8'],
            correctAnswer: 1,
            explanation: 'Most standard cars use a 4-cylinder 4-stroke engine.'
        }
    ];

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_template.json';
    a.click();
    URL.revokeObjectURL(url);
};
