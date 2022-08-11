// Helper function to validate body
export const isValidBody = (title: any, content: any, imageUrl: any, languageId: any): boolean => {
    return (typeof title == "string") &&
    (typeof content == "string") &&
    (typeof imageUrl == "string" || typeof imageUrl == "undefined") &&
    (typeof languageId == "number" || typeof languageId == "undefined");
}