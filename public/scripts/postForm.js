const contactFormSubmitButton = document.getElementById('contact-form-submit-button')
const contactForm = document.getElementById('contactForm')
const contactFormName = document.getElementById('contact-form-name')
const contactFormEmail = document.getElementById('contact-form-email')
const contactFormService = document.getElementById('contact-form-service')
const contactFormMessage = document.getElementById('contact-form-message')
const socket = io();

contactFormSubmitButton.addEventListener('click', () => {
    const userServiceRequestContent = { name: contactFormName.value, email: contactFormEmail.value, service: contactFormService.value, message: contactFormMessage.value }
    socket.emit('userServiceRequest', userServiceRequestContent)
    contactForm.reset()
})

socket.on('initResult', (message) => {
    console.log(message)
});