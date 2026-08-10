/* =========================================================
   ESTEFANIA LEON
   U.S. LEGAL CONSULTATIONS

   Main Website JavaScript
========================================================= */


/* =========================================================
   EMAILJS CONFIGURATION

   IMPORTANT:
   Replace these four values after creating the EmailJS
   service and two email templates.
========================================================= */

const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";

const EMAILJS_INTAKE_TEMPLATE_ID =
  "YOUR_INTAKE_TEMPLATE_ID";

const EMAILJS_CONFIRMATION_TEMPLATE_ID =
  "YOUR_CONFIRMATION_TEMPLATE_ID";


/* =========================================================
   INITIALIZE EMAILJS
========================================================= */

if (
  window.emailjs &&
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
) {

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });

}


/* =========================================================
   SMOOTH PAGE NAVIGATION
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function(event) {

    const targetId = this.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {

      event.preventDefault();

      return;

    }

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  });

});


/* =========================================================
   STICKY HEADER SHADOW
========================================================= */

const header =
  document.querySelector(".site-header");

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 20) {

    header.classList.add(
      "header-scrolled"
    );

  } else {

    header.classList.remove(
      "header-scrolled"
    );

  }

}

window.addEventListener(
  "scroll",
  updateHeader
);

updateHeader();


/* =========================================================
   SUBTLE SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".service-card, " +
    ".process-step, " +
    ".pricing-card, " +
    ".intake-layout, " +
    ".attorney-section, " +
    ".disclaimer-card"
  );


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach(
    (element) => {

      element.classList.add(
        "reveal"
      );

      observer.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   AUTO-SELECT CONSULTATION LENGTH

   Clicking the 30-minute or 60-minute pricing buttons
   automatically selects the matching option in the intake.
========================================================= */

const consultLength =
  document.getElementById(
    "consultLength"
  );


document
  .querySelectorAll(".pricing-card")
  .forEach((card) => {

    const button =
      card.querySelector(".btn");

    const time =
      card.querySelector(
        ".pricing-time"
      );

    if (
      !button ||
      !time ||
      !consultLength
    ) {

      return;

    }

    button.addEventListener(
      "click",
      () => {

        const text =
          time.textContent
            .trim()
            .toLowerCase();


        if (
          text.includes("30")
        ) {

          consultLength.value =
            "30 minutos - $30";

        }


        if (
          text.includes("60")
        ) {

          consultLength.value =
            "60 minutos - $60";

        }

      }
    );

  });


/* =========================================================
   LEGAL INTAKE FORM
========================================================= */

const intakeForm =
  document.getElementById(
    "legalIntakeForm"
  );

const formStatus =
  document.getElementById(
    "formStatus"
  );

const submitButton =
  document.getElementById(
    "submitIntake"
  );


/* =========================================================
   HELPER:
   FORM STATUS MESSAGE
========================================================= */

function showFormStatus(
  type,
  message
) {

  if (!formStatus) return;

  formStatus.className =
    "form-status " + type;

  formStatus.textContent =
    message;

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

if (intakeForm) {

  intakeForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      /* ---------------------------------
         Browser validation
      --------------------------------- */

      if (
        !intakeForm.checkValidity()
      ) {

        intakeForm.reportValidity();

        return;

      }


      /* ---------------------------------
         Verify EmailJS configuration
      --------------------------------- */

      if (
        EMAILJS_PUBLIC_KEY ===
          "YOUR_PUBLIC_KEY" ||

        EMAILJS_SERVICE_ID ===
          "YOUR_SERVICE_ID" ||

        EMAILJS_INTAKE_TEMPLATE_ID ===
          "YOUR_INTAKE_TEMPLATE_ID" ||

        EMAILJS_CONFIRMATION_TEMPLATE_ID ===
          "YOUR_CONFIRMATION_TEMPLATE_ID"
      ) {

        showFormStatus(

          "error",

          "El formulario todavía está en modo de configuración. Por favor escribe directamente a estefania.rojas137@gmail.com."

        );

        return;

      }


      /* ---------------------------------
         Disable button
      --------------------------------- */

      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          "Enviando solicitud...";

      }


      formStatus.className =
        "form-status";

      formStatus.textContent =
        "";


      /* ---------------------------------
         Gather form data
      --------------------------------- */

      const formData =
        new FormData(
          intakeForm
        );


      const templateParams = {

        first_name:
          formData.get(
            "first_name"
          ),

        last_name:
          formData.get(
            "last_name"
          ),

        email:
          formData.get(
            "email"
          ),

        phone:
          formData.get(
            "phone"
          ),

        country:
          formData.get(
            "country"
          ),

        jurisdiction:
          formData.get(
            "jurisdiction"
          ) ||
          "No indicado",

        legal_area:
          formData.get(
            "legal_area"
          ),

        consult_length:
          formData.get(
            "consult_length"
          ),

        other_party:
          formData.get(
            "other_party"
          ) ||
          "No indicado",

        deadline:
          formData.get(
            "deadline"
          ) ||
          "No indicado",

        matter_summary:
          formData.get(
            "matter_summary"
          )

      };


      try {

        /* ---------------------------------
           Email #1:
           Intake to Estefania
        --------------------------------- */

        await emailjs.send(

          EMAILJS_SERVICE_ID,

          EMAILJS_INTAKE_TEMPLATE_ID,

          templateParams

        );


        /* ---------------------------------
           Email #2:
           Confirmation to submitter
        --------------------------------- */

        await emailjs.send(

          EMAILJS_SERVICE_ID,

          EMAILJS_CONFIRMATION_TEMPLATE_ID,

          templateParams

        );


        /* ---------------------------------
           Success
        --------------------------------- */

        showFormStatus(

          "success",

          "Gracias. Tu solicitud fue enviada correctamente. También recibirás una confirmación en el correo electrónico que proporcionaste."

        );


        intakeForm.reset();


        formStatus.scrollIntoView({

          behavior: "smooth",

          block: "center"

        });


      } catch (error) {

        console.error(
          "EmailJS error:",
          error
        );


        showFormStatus(

          "error",

          "No pudimos enviar tu solicitud en este momento. Intenta nuevamente o escribe directamente a estefania.rojas137@gmail.com."

        );

      } finally {

        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.textContent =
            "Enviar solicitud";

        }

      }

    }
  );

}


/* =========================================================
   CHARACTER COUNTER
========================================================= */

const matterSummary =
  document.getElementById(
    "matterSummary"
  );


if (matterSummary) {

  const characterCounter =
    document.createElement(
      "div"
    );

  characterCounter.className =
    "character-counter";

  characterCounter.textContent =
    "0 / 2500 caracteres";


  matterSummary
    .parentNode
    .appendChild(
      characterCounter
    );


  matterSummary.addEventListener(
    "input",
    () => {

      const count =
        matterSummary
          .value
          .length;

      characterCounter.textContent =
        count +
        " / 2500 caracteres";

    }
  );

}


/* =========================================================
   EXTERNAL LINK SAFETY
========================================================= */

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach((link) => {

    const rel =
      link.getAttribute("rel") || "";

    if (
      !rel.includes("noopener")
    ) {

      link.setAttribute(
        "rel",
        (
          rel +
          " noopener noreferrer"
        ).trim()
      );

    }

  });
