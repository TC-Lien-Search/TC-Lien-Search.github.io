  'use strict';

  // Initiate EmailJS
  emailjs.init("user_0gRGuJbPC5KgSYxF5CZOR");

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

    // Contact Form Submit
  on('submit','#order-form', function(e){
    e.preventDefault();
    // emailjs.sendForm('service_2qal3w6','template_1h7dyyt', '#order-form')
    // .then(resp => {
    //   document.querySelector('.sent-message').style.display = 'block';
    // })
    // .catch(err =>{
    //   document.querySelector('.error-message').style.display = 'block';
    // })
  });

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })