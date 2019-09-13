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


    let doctorSearch = new DoctorSearch();
    let promise = doctorSearch.getDoctorResults(keyword, name);

    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);

    }, function(error) {

    });
  });

});
