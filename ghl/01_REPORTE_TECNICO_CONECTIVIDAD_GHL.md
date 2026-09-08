# INFORME TÉCNICO DE CONECTIVIDAD E INTEGRACIÓN WEB ➔ GOHIGHLEVEL (GHL)

**Destinatario:** Asesor Técnico / Especialista de GoHighLevel (GHL)  
**Proyecto:** Ecosistema Web & Funnel Inmobiliario **ARUZ** (`aruz.com.mx`)  
**Repositorio:** `https://github.com/gastonmorante/aruzwebsite.git` (Branch `main` · Commit `0bef02c`)  
**Arquitectura:** Node.js / Express Server + Client-Side Dual-Dispatch + LeadConnector API v2  

---

## 1. RESUMEN DE LA ARQUITECTURA DE INTEGRACIÓN

La web de **ARUZ** ha sido configurada bajo una **Arquitectura Híbrida de Doble Despacho (Dual-Dispatch)** para garantizar que **ningún lead se pierda**, eliminando la fuga de contactos que ocurre cuando los usuarios navegan hacia WhatsApp sin completar el registro en el CRM.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                SITIO WEB ARUZ (FRONTEND)                               │
│  - Captura de UTMs & Click IDs (sessionStorage / localStorage)                         │
│  - Formularios de Preventa & Captura de Leads                                          │
│  - Two-Step Lead Gate (Descarga de Dossiers / Planos PDF)                              │
│  - Modal de Agendamiento de Citas con Calendario GHL                                   │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
┌──────────────────────────────────────┐      ┌──────────────────────────────────────────┐
│         DESPACHO INMEDIATO           │      │        DESPACHO ASÍNCRONO AL CRM         │
│  Apertura de WhatsApp con mensaje    │      │  POST /api/ghl-webhook (Server-Side)     │
│  estructurado hacia Dirección        │      │  + Disparo GTM dataLayer (generate_lead) │
└──────────────────────────────────────┘      └────────────────────┬─────────────────────┘
                                                                   │
                                           ┌───────────────────────┴─────────────────────┐
                                           ▼                                             ▼
                        ┌─────────────────────────────────────┐       ┌────────────────────────────────────┐
                        │        GHL API v2 (REST API)        │       │       GHL INBOUND WEBHOOK          │
                        │  POST /contacts/upsert              │       │  Trigger para Workflows de         │
                        │  - Creación / Actualización Contact │       │  Automatización, Pipeline y SMS    │
                        │  - Inyección de Tags & CustomFields │       │                                    │
                        └─────────────────────────────────────┘       └────────────────────────────────────┘
```

---

## 2. ENDPOINTS SERVER-SIDE DISPONIBLES EN LA WEB

El servidor de la web expone los siguientes endpoints para comunicar con GoHighLevel:

| Endpoint | Método | Descripción |
| :--- | :---: | :--- |
| **`/api/ghl-webhook`** | `POST` | Puente principal de recepción de prospectos. Ejecuta el upsert en la API v2 de LeadConnector y reenvía el payload al webhook de workflows. |
| **`/api/lead`** | `POST` | Endpoint alternativo de captura con cola de respaldo y sanitización de datos. |
| **`/api/ghl-event`** | `POST` | Receptor de eventos de telemetría y comportamiento del usuario (clics en WhatsApp, aperturas de calendario, etc.). |
| **`/health`** | `GET` | Sonda de monitoreo de estado del servidor para Render.com (retorna `200 OK`). |

---

## 3. ESPECIFICACIÓN DEL PAYLOAD JSON ENVIADO A GOHIGHLEVEL

Cada vez que un usuario interactúa con un formulario o descarga un dossier en la web, se envía el siguiente payload estandarizado en formato JSON:

```json
{
  "firstName": "Carlos",
  "lastName": "Mendoza",
  "name": "Carlos Mendoza",
  "email": "carlos.mendoza@ejemplo.com",
  "phone": "+529841234567",
  "interest": "Casa Tu'ux - Preventa Mayakoba",
  "message": "Solicito información sobre el plan de financiamiento 30/70.",
  "page": "/landings/casa-tuux.html",
  "tags": [
    "Web Lead",
    "ARUZ Website",
    "Casa Tuux",
    "Mayakoba"
  ],
  "customFields": {
    "interes_inmobiliario": "Casa Tu'ux - Preventa Mayakoba",
    "mensaje_prospecto": "Solicito información sobre el plan de financiamiento 30/70.",
    "landing_page_origen": "/landings/casa-tuux.html",
    "utm_source": "google_ads",
    "utm_medium": "cpc",
    "utm_campaign": "mayakoba_preventas_2026",
    "utm_term": "casas en venta mayakoba",
    "utm_content": "anuncio_banner_01",
    "gclid": "CjwKCAjwwfnUBhAtEiwAfQpAYg...",
    "fbclid": "IwAR2V8kX9...",
    "gad_source": "1"
  },
  "source": "Sitio Web Oficial ARUZ",
  "timestamp": "2026-09-08T15:00:00.000Z"
}
```

---

## 4. MAPEO DE CAMPOS PERSONALIZADOS (*CUSTOM FIELDS*) REQUERIDOS EN GHL

Para que GoHighLevel almacene correctamente toda la información técnica y de atribución, se recomienda dar de alta los siguientes **Campos Personalizados (Custom Fields)** en la subcuenta de GHL (*Settings ➔ Custom Fields*):

| Nombre del Campo en GHL | Object | Tipo de Campo | Key Identificador |
| :--- | :--- | :--- | :--- |
| **Interés Inmobiliario** | Contact | Single Line Text / Dropdown | `interes_inmobiliario` |
| **Mensaje del Prospecto** | Contact | Large Text (Textarea) | `mensaje_prospecto` |
| **Landing Page de Origen** | Contact | Single Line Text | `landing_page_origen` |
| **UTM Source** | Contact | Single Line Text | `utm_source` |
| **UTM Medium** | Contact | Single Line Text | `utm_medium` |
| **UTM Campaign** | Contact | Single Line Text | `utm_campaign` |
| **UTM Term** | Contact | Single Line Text | `utm_term` |
| **UTM Content** | Contact | Single Line Text | `utm_content` |
| **Google Click ID (GCLID)** | Contact | Single Line Text | `gclid` |
| **Facebook Click ID (FBCLID)**| Contact | Single Line Text | `fbclid` |

---

## 5. SISTEMA DE TAGS AUTOMÁTICAS POR PROPIEDAD

El sistema clasifica automáticamente a los prospectos asignando tags dinámicas según el origen de la consulta:

* **Tags Globales:** `Web Lead`, `ARUZ Website`.
* **Preventas Mayakoba:** `Casa Eternity Jol`, `Casa Tuux`, `Casa Sak Luum`, `Casa Kaak Naajal`, `Casa Mia`, `Casa Ku`, `Mayakoba`.
* **Lotes Residenciales:** `Lomas Aurora`, `Xpu-Ha Oasis`, `Lotes Residenciales`, `Club de Playa`.
* **Construcción & Maquinaria:** `ARUZ Construccion`, `ARUZ Maquinaria`.
* **Lead Magnets:** `Dossier Downloaded`, `Plano Catastral Solicitado`.

---

## 6. INTEGRACIÓN DEL CALENDARIO GOHIGHLEVEL

### Funcionamiento del Modal de Citas:
En la web se encuentra activa la función global:
```javascript
window.openGHLCalendar('ID_DE_TU_CALENDARIO', 'Casa Tuux');
```
- **Comportamiento:** Despliega un modal responsivo optimizado que carga el iframe oficial de LeadConnector:
  `https://api.leadconnectorhq.com/widget/booking/<calendar_id>?utm_source=...`
- **Atribución Automática:** Transfiere automáticamente los parámetros UTM capturados en la sesión al calendario.
- **Rendimiento:** El iframe **no se carga en el DOM inicial**, sino únicamente cuando el usuario hace clic en "Agendar Recorrido / Cita VIP", garantizando 100/100 en Google Lighthouse.

---

## 7. EVENT TRACKING Y EVENTOS PERSONALIZADOS EN CLIENTE

Los botones principales (CTAs) de la web ejecutan `window.trackGHLEvent(eventName, eventData)` que dispara simultáneamente:
1. **Google Tag Manager:** Evento en `window.dataLayer`.
2. **Meta Pixel:** Evento `fbq('trackCustom', eventName, eventData)`.
3. **Servidor GHL:** Petición `POST /api/ghl-event`.

### Catálogo de Eventos Activos:
- `lead_form_submitted`: Envío de formulario general de preventa o lotes.
- `dossier_gate_opened`: Apertura del modal para desbloquear planos/dossier.
- `dossier_downloaded`: Descarga confirmada de ficha técnica en PDF.
- `calendar_booking_initiated`: Clic en botón para agendar llamada o recorrido VIP.
- `whatsapp_floating_click`: Clic en el botón flotante de WhatsApp.

---

## 8. WORKFLOWS RECOMENDADOS PARA CONFIGURAR DENTRO DE GHL

### 🔹 Workflow 1: "Nuevo Lead Web ➔ Pipeline Inmobiliario & Alerta Inmediata"
- **Trigger:** *Inbound Webhook* (URL conectada a `GHL_WEBHOOK_URL`) o *Contact Created* (Source = `ARUZ Web Funnel`).
- **Acción 1:** Crear / Actualizar Oportunidad en Pipeline:
  - *Pipeline:* `Ventas ARUZ Real Estate`
  - *Stage:* `Nuevo Prospecto Calificado (Web)`
  - *Opportunity Name:* `{{contact.name}} - {{contact.interes_inmobiliario}}`
- **Acción 2:** Enviar Notificación Interna (SMS / App Push) al Director de Operaciones:
  > *"Nuevo Lead Web: {{contact.name}} | Tel: {{contact.phone}} | Interés: {{contact.interes_inmobiliario}} | Campaña: {{contact.utm_campaign}}"*
- **Acción 3:** Enviar WhatsApp / SMS Automático de Bienvenida al Prospecto:
  > *"Hola {{contact.first_name}}, gracias por contactar a ARUZ Desarrolladora. Hemos recibido tu solicitud sobre {{contact.interes_inmobiliario}}. En breve un director de operaciones se comunicará contigo."*
- **Acción 4:** Enviar Email con Dossier Técnico adjunto.

### 🔹 Workflow 2: "Entrega Automatizada de Dossier & Planos (Lead Magnet)"
- **Trigger:** *Contact Tag Added* ➔ Tag = `Dossier Downloaded`.
- **Acción 1:** Enviar Email con enlace directo al PDF en alta resolución.
- **Acción 2:** Esperar 15 minutos ➔ Si no ha agendado cita, enviar WhatsApp sugiriendo agendar recorrido en showroom o visita a Mayakoba / Xpu-Ha.

### 🔹 Workflow 3: "Confirmación de Cita / Recorrido en Calendario"
- **Trigger:** *Appointment Status* ➔ `Confirmed`.
- **Acción 1:** Sincronizar con Google Calendar de Dirección.
- **Acción 2:** Enviar recordatorio por WhatsApp 24 horas y 1 hora antes de la videollamada / recorrido.

---

## 9. VARIABLES DE ENTORNO QUE DEBE PROPORCIONAR EL ASESOR DE GHL

```env
# 1. API Key de la Subcuenta en GHL (o Token Bearer de API v2)
GHL_API_KEY=ghl_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 2. Location ID (ID de la subcuenta donde se guardarán los contactos)
GHL_LOCATION_ID=xxxxxxxxxxxxxxxxxxxx

# 3. Webhook de Entrada del Workflow Principal (Inbound Webhook)
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/TU_WEBHOOK_ID_AQUI

# 4. ID del Calendario Oficial para Agendar Citas
GHL_CALENDAR_ID=tu_calendar_id_aqui

# 5. ID del Widget de Chat Web (Opcional)
GHL_CHAT_WIDGET_ID=tu_chat_widget_id_aqui
```
