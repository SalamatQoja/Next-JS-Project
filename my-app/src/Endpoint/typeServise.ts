export interface FormRequest {
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    phone_number: string;
}

export interface FormResponse {
    success: boolean;
    application: {
        id: number | string;
        first_name: string;
        last_name: string;
        company_name: string;
        email: string;
        phone_number: string;
        created_at: string;
    }
}