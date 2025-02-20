export interface SurveyResponse {
    id: string;
    surveyId: string;
    responses: {
        questionId: string;
        questionType: string;
        questionValue: string;
        answer: string | number | string[] | number[] | null ;
        required: boolean;
    }[];
    status: string;
}
