import { post } from "$lib/api.js"
import template from 'lodash/template'
export function sendEmail(data) {

    const example_template = "<p>Hi <%= USER.username %>!</p><p>Please click on the link below to login on the site.</p><p><%= URL %>?loginToken=<%= CODE %></p><p>Thanks.</p>"
    const { to, subject, stuff } = data
    const compiled = template(template)
    const html = compiled(stuff)
    let emailData = {
        to, subject , html
    }
    return post('/email',emailData)
} 