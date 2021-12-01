  'use strict';

  let searchTimeout;

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

//Geocode API (geocodeapi.com)
let geocodeCont = document.querySelector('.geocode-outer');
let propertyAddressElem = document.getElementById('property_address');

propertyAddressElem.addEventListener('keyup', propertyAddressListener, false);

document.querySelector('.manual-address-checkbox').addEventListener('click', e => {
  if(e.target.checked){
    e.target.value = true;
    propertyAddressElem.removeEventListener('keyup', propertyAddressListener, false);
    geocodeCont.classList.add('d-none');
  } else {
    e.target.value = false;
    propertyAddressElem.addEventListener('keyup', propertyAddressListener, false);
    geocodeCont.classList.remove('d-none');
  }
})

function propertyAddressListener(e){
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(()=>{
    let apiRequest = fetch(`https://app.geocodeapi.io/api/v1/autocomplete?text=${e.target.value}&apikey=66e83380-52d8-11ec-8723-f1b33ac38706&size=5`);
    apiRequest.then(resp => {
      return resp.json();
    })
    .then(data => {
      console.log(data);
      let geocodeHTML = "";
      if(data.features.length){
        data.features.forEach(item => {
          geocodeHTML += `
            <div class="geocode-item">
              <p data-label="${item.properties.label}">${item.properties.label}</p>
            </div>
          `;
        })
      }
      document.querySelector('.geocode-inner').innerHTML = geocodeHTML;
      document.querySelectorAll('.geocode-item').forEach(node => {
        node.addEventListener('click', e => {
          let label = e.target.getAttribute('data-label');
          propertyAddressElem.value = label;
          geocodeCont.classList.add('d-none');
        });
      })
    })
  }, 1000);
}

document.querySelector('.form-submit').addEventListener('click', e =>{

})

// Contact Form Submit
on('submit','#order-form', function(e){
  e.preventDefault();
  emailjs.sendForm("service_2qal3w6","template_1h7dyyt", "#order-form")
  .then(resp => {
    console.log(resp);
    document.querySelector('.order-form-success').innerHTML = "Your order has been submitted. You will receive a confirmation email shortly. Please contact us if you haven't received your confirmation email within 24 hours. Thank you!";
  })
  .catch(err =>{
    console.log(err);
    document.querySelector('.order-form-fail').innerHTML = "There was an error submitting the form. Please email us directly at: TCLienSearch@gmail.com.";
  })
  .finally(()=>{
    document.querySelector('.form-submit').disabled = true;
  })
});