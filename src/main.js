import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorSearch } from './backend.js';

$(document).ready(function() {
  $('#doctor-search').submit(function() {
    event.preventDefault();
    let keyword = $('#keyword-search').val();
    let name = $('#name-search').val();
    $('#keyword-search').val("");
    $('#name-search').val("");
    $('#search-results').text("");

    let doctorSearch = new DoctorSearch();
    let promise = doctorSearch.getDoctorResults(keyword, name);

    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body.meta.total);
      let newPatients;
      if (body.data.length === 0) {
        $("#search-results").append(`<div class='strong'>Sorry, your search did not return any results. Please try searching with different parameters.</div>`);
      }
      for (let i = 0; i < body.data.length; i++) {
        $("#search-results").append(
          `<div id="accordion">
          <div class="card bg-light mb-3">
          <div class="card-header" id="heading${i}" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=name${i}></div>
          <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
          <div class="card-body">
          <div id=image${i} class="image"></div>
          <div id=specialty${i}></div>
          <div id=practice${i}></div>
          <div id=address${i}></div>
          <div id=phone${i}></div>
          <div id=newpatients${i}></div>
          <div id=profile${i}></div>
          </div>
          </div>
          </div>
          </div>`);

          if (body.data[i].practices[0].accepts_new_patients === true) {
            newPatients = "Yes"
          } else {
            newPatients = "No"
          }

          $(`#name${i}`).html(`${body.data[i].profile.first_name} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}`);

          $(`#image${i}`).html(`<img class="card-img-left" src=${body.data[i].profile.image_url} alt="Card image cap">`)

          $(`#practice${i}`).html(`<p><span class='strong'>Practice Name:</span> ${body.data[i].practices[0].name}</p>`)

          $(`#specialty${i}`).html(`<p><span class='strong'>Specialty:</span> ${body.data[i].specialties[0].description}</p>`)


          $(`#address${i}`).html(`<p><span class='strong'>Address:</span> ${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}, ${body.data[i].practices[0].visit_address.zip}`);

          $(`#phone${i}`).html(`<p><span class='strong'>Phone:</span> ${body.data[i].practices[0].phones[0].number}</p>`);

          $(`#newpatients${i}`).html(`<p><span class='strong'>Accepting New Patients:</span> ${newPatients} </p>`);

          $(`#profile${i}`).html(`<p>${body.data[i].profile.bio}</p>`)
        }

      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      });
    });
  });
