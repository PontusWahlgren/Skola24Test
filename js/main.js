import {absences, absenceReasons} from './data.js';

$(document).ready(function() {
    
    $(".plus-sign").on("click", function() {
        addRandomCard();
    });
    
    function addRandomCard() {
        var randomIndex = Math.floor(Math.random() * absences.length);
        var absence = getAbsenceByIndex(randomIndex);
        
        var absenceDate = checkAndSetAbsenceTime(absence);
        
        console.log(absence);
        
        var cardHtml = '<div class="card"><div class="content">';
        cardHtml += '<h3 class="card-name"><strong>' + absence.firstName + ' ' + absence.lastName + '</strong></h3>';
        cardHtml += '<p class="card-date">' + absenceDate + '</p>';
        cardHtml += '<p class="card-description">' + absence.absenceReason[0].id + '</p>';
        cardHtml += '</div></div>';
        
        $("#absences-container .card:last").before(cardHtml);
    }
    
    function getAbsenceByIndex(randomIndex) {
        var absence = absences[randomIndex];
        
        if(hasValue(absence.reasonGuid)) {
            absence.absenceReason = getAbsenceReason(absence.reasonGuid);  
        } else {
            absence.absenceReason = [
                {
                    id: "",
                    guid: absence.reasonGuid
                }
            ];
        }
        
        return absence;
    }
    
    function getAbsenceReason(reasonGuid) {
        var absenceReason = absenceReasons.filter(
            (x) => x.guid === reasonGuid
        );

        return absenceReason;
    }
    
    function hasValue(obj)
    {
        return obj && obj !== 'null' && obj !== 'undefined';
    }
    
    function checkAndSetAbsenceTime(absence) {
        var dateOptions = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
        
        var dateFrom = hasValue(absence.dateTimeFrom) ? new Date(absence.dateTimeFrom) : absence.dateTimeFrom;
        var dateTo = hasValue(absence.dateTimeTo) ? new Date(absence.dateTimeTo) : absence.dateTimeTo;
        var formattedDateFrom = "";
        var formattedDateTo = "";
        
        console.log(dateFrom);
        console.log(dateTo);
        
        if(hasValue(dateFrom) && hasValue(dateTo)) {
            console.log('jaha');
            if((dateFrom.getHours() === 0 && dateFrom.getMinutes() === 0) && 
                (dateTo.getHours() === 23 && dateTo.getMinutes() === 59)
            ) {
                dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
                if(dateFrom.getDay() === dateTo.getDay()) {
                    console.log('lika');
                    // Only one date needed, send back formatted date for fromDate
                    formattedDateFrom = dateFrom.toLocaleDateString('sv-se', dateOptions);
                    
                    return capitalizeFirstLetter(formattedDateFrom);
                } else {
                    console.log('inte lika');
                    formattedDateFrom = dateFrom.toLocaleDateString('sv-se', dateOptions);
                    formattedDateTo = dateTo.toLocaleDateString('sv-se', dateOptions);
                    
                    return capitalizeFirstLetter(formattedDateFrom) + ' - ' + capitalizeFirstLetter(formattedDateTo);
                }
            } else {
                if(dateFrom.getHours() === 0 && dateFrom.getMinutes() === 0) {
                    dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
                    formattedDateFrom = dateFrom.toLocaleDateString('sv-se', dateOptions);
                } else {
                    formattedDateFrom = dateFrom.toLocaleTimeString('sv-se', dateOptions);
                }
                
                if(dateTo.getHours() === 0 && dateTo.getMinutes() === 0) {
                    dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
                    formattedDateTo = dateTo.toLocaleDateString('sv-se', dateOptions);
                } else {
                    formattedDateTo = dateTo.toLocaleTimeString('sv-se', dateOptions);
                }
                
                return capitalizeFirstLetter(formattedDateFrom) + ' - ' + capitalizeFirstLetter(formattedDateTo);
            }
        } else {
            console.log('nähä');
            if(!hasValue(dateFrom)) {
                console.log('ja 1');
                formattedDateFrom = 'Tillsvidare';
            } else {
                console.log('ja 2');
                if(dateFrom.getHours() === 0 && dateFrom.getMinutes() === 0) {
                    dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
                    formattedDateFrom = dateFrom.toLocaleDateString('sv-se', dateOptions);
                } else {
                    formattedDateFrom = dateFrom.toLocaleTimeString('sv-se', dateOptions);
                }
            }
            
            if(!hasValue(dateTo)) {
                console.log('ja 3');
                formattedDateTo = 'Tillsvidare';
            } else {
                console.log('ja 4');
                if(dateTo.getHours() === 0 && dateTo.getMinutes() === 0) {
                    dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
                    formattedDateTo = dateTo.toLocaleDateString('sv-se', dateOptions);
                } else {
                    formattedDateTo = dateTo.toLocaleTimeString('sv-se', dateOptions);
                }
            }
            
            return capitalizeFirstLetter(formattedDateFrom) + ' - ' + capitalizeFirstLetter(formattedDateTo);
        }
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
});