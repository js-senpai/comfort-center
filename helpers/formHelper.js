export const checkName = (value) => /\D/g.test(value)
export const toFormData = (emailBody) => {
    const form = new FormData()
    for (const field in emailBody) {
        form.append(field, emailBody[field])
    }
    return form
}
