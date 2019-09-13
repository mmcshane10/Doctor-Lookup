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
    $('#search-results').val("");


    let doctorSearch = new DoctorSearch();
    let promise = doctorSearch.getDoctorResults(keyword, name);

    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body.meta.total);
      for (let i = 0; i < body.meta.total; i++) {
        $("#search-results").append(
          `<div id="accordion">
          <div class="card bg-light mb-3">
          <div class="card-header" id="heading${i}" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=title${i}></div>
          <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
          <div class="card-body">
          <div id=company${i}></div>
          <div id=location${i}></div>
          <div id=description${i}></div>
          <div id=url${i}></div>
          </div>
          </div>
          </div>
          </div>`);
      }




    }, function(error) {

    });
  });

});
