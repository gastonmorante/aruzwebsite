# BLUEPRINT DE WORKFLOWS DE AUTOMATIZACIÓN EN GOHIGHLEVEL (GHL)

Este documento contiene la lógica paso a paso y los copys de comunicación para los 3 Workflows de alto rendimiento recomendados para **ARUZ Desarrolladora & Inmobiliaria**.

---

## 🔹 WORKFLOW 1: "Nuevo Lead Web ➔ Pipeline Inmobiliario & Alerta Inmediata"

* **Objetivo:** Registrar el lead, asignarlo a la etapa inicial del pipeline, notificar a Dirección de Operaciones y enviar bienvenida personalizada.
* **Trigger:** *Inbound Webhook* (URL vinculada a `GHL_WEBHOOK_URL`) o *Contact Created* (Source = `ARUZ Web Funnel`).

### Acciones del Workflow:
1. **Action: Add Contact Tag**  
   - Tags: `Web Lead`, `ARUZ Website`, `{{contact.interes_inmobiliario}}`
2. **Action: Create/Update Opportunity**  
   - *Pipeline:* `Ventas ARUZ Real Estate`  
   - *Stage:* `Nuevo Prospecto Calificado`  
   - *Opportunity Name:* `{{contact.name}} - {{contact.interes_inmobiliario}}`  
   - *Lead Value:* `$5,150,000` (o dinámico según interés)
3. **Action: Internal Notification (SMS / Push a Dirección)**  
   - *Destinatario:* Dirección de Operaciones (+52 984 130 8260)  
   - *Mensaje:*  
     > 🚨 **NUEVO LEAD CALIFICADO DESDE SITIO WEB ARUZ**  
     > 👤 **Nombre:** {{contact.name}}  
     > 📱 **Teléfono:** {{contact.phone}}  
     > 📧 **Correo:** {{contact.email}}  
     > 🏛️ **Interés:** {{contact.interes_inmobiliario}}  
     > 💬 **Mensaje:** {{contact.mensaje_prospecto}}  
     > 📊 **Campaña:** {{contact.utm_campaign}} ({{contact.utm_source}})
4. **Action: Send WhatsApp / SMS to Contact (Automated Welcome)**  
   - *Mensaje:*  
     > *Hola {{contact.first_name}}, gracias por tu interés en ARUZ Desarrolladora.*  
     > *Hemos recibido tu solicitud sobre **{{contact.interes_inmobiliario}}**. Un asesor de la Dirección Operativa se pondrá en contacto contigo a la brevedad.*  
     > *Si deseas agendar tu recorrido privado o videollamada de autor de inmediato, puedes seleccionar tu horario aquí: https://aruz.com.mx/#contacto*
5. **Action: Send Email (Ficha Técnica & Dossier de Preventa)**  
   - *Asunto:* Dossier Oficial & Condiciones de Preventa: {{contact.interes_inmobiliario}}  
   - *Contenido:* Saludo corporativo, descripción de la residencia/lote y enlace al PDF autorizado.

---

## 🔹 WORKFLOW 2: "Lead Magnet ➔ Entrega de Dossier & Planos Catastrales"

* **Objetivo:** Nutrir a los usuarios que descargaron planos o dossiers desde el modal Lead Gate.
* **Trigger:** *Contact Tag Added* ➔ Tag = `Dossier Downloaded`.

### Acciones del Workflow:
1. **Action: Send Email con Dossier Adjunto**  
   - *Asunto:* Tu Dossier Arquitectónico Autorizado - ARUZ  
   - *Body:* Entrega de planos, renders en alta definición y especificaciones de acabados.
2. **Action: Wait (Delay de 20 Minutos)**
3. **Action: Send WhatsApp Follow-up**  
   - *Mensaje:*  
     > *Hola {{contact.first_name}}, ¿pudiste revisar los planos de {{contact.interes_inmobiliario}}?*  
     > *Contamos con promociones exclusivas en enganche y bono de equipamiento para este mes. ¿Te gustaría coordinar una videollamada de 15 minutos para resolver dudas técnicas?*

---

## 🔹 WORKFLOW 3: "Confirmación y Recordatorios de Cita en Calendario"

* **Objetivo:** Maximizar la tasa de asistencia (*Show-up Rate*) a citas y recorridos en Mayakoba / Lomas Aurora / Showroom.
* **Trigger:** *Appointment Status* ➔ `Confirmed` (Calendario = `ARUZ VIP Tour Booking`).

### Acciones del Workflow:
1. **Action: Update Opportunity Stage** ➔ `Cita / Recorrido Agendado`.
2. **Action: Confirmation Email & WhatsApp (Inmediato)**  
   - Envío de fecha, hora, enlace de Google Meet o ubicación de Showroom Plaza Palmeras Local 212.
3. **Action: Wait Until 24 Hours Before Appointment**  
   - **Action: Send WhatsApp Reminder (24h antes)**:  
     > *Hola {{contact.first_name}}, te recordamos tu cita con Dirección de ARUZ mañana a las {{appointment.start_time}}. Te esperamos en Plaza Palmeras Local 212, Playa del Carmen.*
4. **Action: Wait Until 1 Hour Before Appointment**  
   - **Action: Send SMS Reminder (1h antes)**.
