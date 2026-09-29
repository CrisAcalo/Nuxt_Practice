<script setup lang="ts">
const submitted = ref(false)

function required(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0 || 'Este campo es obligatorio.'
}

function validEmail(value: unknown) {
  if (required(value) !== true) return 'Este campo es obligatorio.'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) || 'Ingresa un correo válido.'
}

function validMessage(value: unknown) {
  if (required(value) !== true) return 'Este campo es obligatorio.'
  return String(value).trim().length >= 10 || 'Escribe al menos 10 caracteres.'
}

function onSubmit() {
  submitted.value = true
}

useSeoMeta({
  title: 'Contacto — BlogCris',
  description: 'Prueba el formulario de contacto de BlogCris.',
})
</script>

<template>
  <div class="container simple-page contact-page">
    <p class="eyebrow"><span class="eyebrow-line" /> EN CONTACTO</p>
    <h1>Empecemos una <em>conversación.</em></h1>
    <p class="lead">Prueba el formulario y sus validaciones. Esta demostración no envía correos ni guarda tus datos.</p>
    
    <div class="contact-grid">
      <div class="contact-note">
        <span class="panel-index">HOLA, HOLA.</span>
        <h2>Las ideas crecen cuando se comparten.</h2>
        <p>Este espacio demuestra cómo validar campos y mostrar una confirmación de forma clara y accesible.</p>
        <span class="contact-deco" aria-hidden="true">✳</span>
      </div>
      <div class="contact-form-wrap">
        <div v-if="submitted" class="success-state" role="status">
          <span aria-hidden="true">✓</span>
          <h2>Formulario completado</h2>
          <p>La validación fue correcta. Como este es un prototipo, el mensaje no se envió.</p>
          <button class="button button-primary" type="button" @click="submitted = false">Escribir otro mensaje</button>
        </div>
        <VeeForm v-else class="contact-form" @submit="onSubmit">
          <div class="field-group">
            <label for="name">Nombre <span aria-hidden="true">*</span></label>
            <VeeField id="name" name="name" type="text" autocomplete="name" placeholder="Tu nombre" :rules="required" :validate-on-input="true" />
            <VeeErrorMessage name="name" class="field-error" />
          </div>
          <div class="field-group">
            <label for="email">Correo electrónico <span aria-hidden="true">*</span></label>
            <VeeField id="email" name="email" type="email" autocomplete="email" placeholder="tucorreo@ejemplo.com" :rules="validEmail" :validate-on-input="true" />
            <VeeErrorMessage name="email" class="field-error" />
          </div>
          <div class="field-group">
            <label for="message">Mensaje <span aria-hidden="true">*</span></label>
            <VeeField id="message" name="message" as="textarea" rows="5" placeholder="Cuéntanos tu idea…" :rules="validMessage" :validate-on-input="true" />
            <VeeErrorMessage name="message" class="field-error" />
          </div>
          <button class="button button-primary submit-button" type="submit">Validar mensaje <span aria-hidden="true">↗</span></button>
          <p class="form-hint">* Campos obligatorios · Demostración sin envío</p>
        </VeeForm>
      </div>
    </div>
  </div>
</template>
