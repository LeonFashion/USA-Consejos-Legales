/* =========================================================
   ESTEFANIA LEÓN
   U.S. LEGAL CONSULTATIONS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   EMAILJS CONFIGURATION
========================================================= */

const EMAILJS_PUBLIC_KEY = "LYeJ6_owxX85mSBAe";
const EMAILJS_SERVICE_ID = "service_wjz8n7j";
const EMAILJS_TEMPLATE_ID = "template_dhdo4vf";


/* =========================================================
   INITIALIZE EMAILJS
========================================================= */

if (window.emailjs) {

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });

} else {

  console.error(
    "EmailJS no se cargó correctamente."
  );

}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      function(event) {

        const targetId =
          this.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
  document.querySelector(".site-header");

function updateHeader() {

  if (!header) {
    return;
  }

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
   CHARACTER COUNTER
========================================================= */

const messageField =
  document.getElementById("message");

const characterCount =
  document.getElementById(
    "characterCount"
  );

if (
  messageField &&
  characterCount
) {

  function updateCharacterCount() {

    characterCount.textContent =
      messageField.value.length;

  }

  messageField.addEventListener(
    "input",
    updateCharacterCount
  );

  updateCharacterCount();

}


/* =========================================================
   AUTO-SELECT 30 / 60 MINUTE CONSULTATION
========================================================= */

const consultationSelect =
  document.getElementById(
    "consultation"
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
      !consultationSelect
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

        if (text.includes("30")) {

          consultationSelect.value =
            "30 minutos - $30";

        }

        if (text.includes("60")) {

          consultationSelect.value =
            "60 minutos - $60";

        }

      }
    );

  });


/* =========================================================
   FORM STATUS HELPER
========================================================= */

function showFormStatus(
  type,
  message
) {

  const formStatus =
    document.getElementById(
      "formStatus"
    );

  if (!formStatus) {
    return;
  }

  formStatus.className =
    "form-status " + type;

  formStatus.textContent =
    message;

}


/* =========================================================
   LEGAL INTAKE FORM
========================================================= */

const intakeForm =
  document.getElementById(
    "intakeForm"
  );

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
         Find submit button
      --------------------------------- */

      const submitButton =
        intakeForm.querySelector(
          'button[type="submit"]'
        );


      /* ---------------------------------
         Disable button while sending
      --------------------------------- */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "Enviando solicitud...";

      }


      /* ---------------------------------
         Clear previous message
      --------------------------------- */

      const formStatus =
        document.getElementById(
          "formStatus"
        );

      if (formStatus) {

        formStatus.className =
          "form-status";

        formStatus.textContent =
          "";

      }


      try {

        /* ---------------------------------
           Send intake through EmailJS
        --------------------------------- */

        const response =
          await emailjs.sendForm(

            EMAILJS_SERVICE_ID,

            EMAILJS_TEMPLATE_ID,

            intakeForm

          );


        console.log(
          "Email enviado:",
          response.status,
          response.text
        );


        /* ---------------------------------
           Success message
        --------------------------------- */

        showFormStatus(

          "success",

          "¡Gracias! Tu solicitud fue enviada correctamente. Estefania revisará la información proporcionada y se comunicará contigo utilizando los datos de contacto que ingresaste."

        );


        /* ---------------------------------
           Reset form
        --------------------------------- */

        intakeForm.reset();


        if (characterCount) {

          characterCount.textContent =
            "0";

        }


        /* ---------------------------------
           Show success message clearly
        --------------------------------- */

        if (formStatus) {

          formStatus.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }


      } catch (error) {

        console.error(
          "Error de EmailJS:",
          error
        );


        showFormStatus(

          "error",

          "No pudimos enviar tu solicitud en este momento. Por favor intenta nuevamente o escribe directamente a estefania.rojas137@gmail.com."

        );

      } finally {

        /* ---------------------------------
           Restore submit button
        --------------------------------- */

        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.textContent =
            "Preparar Solicitud por Correo";

        }

      }

    }
  );

}


/* =========================================================
   SCROLL REVEAL EFFECT
========================================================= */

const revealElements =
  document.querySelectorAll(

    ".service-card, " +
    ".process-step, " +
    ".pricing-card, " +
    ".intake-layout, " +
    ".attorney-section, " +
    ".disclaimer-card, " +
    ".credential-image-card, " +
    ".professional-highlight-card"

  );


if (
  "IntersectionObserver"
  in window
) {

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
   EXTERNAL LINK SECURITY
========================================================= */

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach((link) => {

    const currentRel =
      link.getAttribute("rel") || "";

    if (
      !currentRel.includes(
        "noopener"
      )
    ) {

      link.setAttribute(

        "rel",

        (
          currentRel +
          " noopener noreferrer"
        ).trim()

      );

    }

  });
