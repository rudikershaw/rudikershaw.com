import $ from 'jquery';
import Whichpet from 'whichx';

// UI Setup for the Whichpet article.
(() => {
    // Set up toggle for reading how it works.
    document.querySelector('#click-for-more a').onclick = () => {
        $('#they-clicked-for-more').slideToggle();
        const caret = $('#click-for-more span');
        if(caret.text() === String.fromCharCode(9658)){
            caret.html('&#9660;');
        } else {
            caret.html('&#9658;');
        }
    };
    // Retrieve the Whichpet UI with an AJAX request.
    fetch('/fragments/whichpet')
        .then(data => data.text())
        .then(text => {
            $('#whichpet-target').html(text);
            // Create the Whichpet object.
            const whichpet = new Whichpet();
            // Define details of popup. If classifier guesses right, re-enforce data,
            // otherwise ask while label to add description to.
            document.querySelector('#input input[type="button"]').onclick = () => {
                const label = $('#input').find('select option:selected').val();
                const description = $('#which-pet').find('textarea').val();
                whichpet.addData(label, description);
                $.ajax({ url: '/fragments/whichpet/add?label='+encodeURIComponent(label)+'&description='+encodeURIComponent(description) }).done(function(data){
                    console.log(data);
                });
                $('.whichpet div.popup').fadeOut(function(){
                    $('.whichpet div.buttons').show();
                    $('#input').hide();
                });
            };
            $('.whichpet input[name="yes"]').click(function(){
                $('.whichpet div.popup').fadeOut();
                const description = $('#which-pet').find('textarea').val();
                const label = whichpet.classify(description);
                whichpet.addData(label, description);
                $.ajax({ url: '/fragments/whichpet/add?label='+encodeURIComponent(label)+'&description='+encodeURIComponent(description) }).done(function(data){
                    console.log(data);
                });
            });
            $('.whichpet input[name="no"]').click(function(){
                $('.whichpet div.buttons').hide();
                $('#input').show();
            });
            // Set up Whichpet to try and guess animal label.
            $('#which-pet input[type="button"]').click(function(){
                const description = $('#which-pet').find('textarea').val();
                $('.whichpet div.popup h3').text('Are you describing a ' + whichpet.classify(description) + '?');
                $('.whichpet div.popup').fadeIn();
            });
            $('a.close-link').click(function(){
                $('.whichpet div.popup').fadeOut(function(){
                    $('.whichpet div.buttons').show();
                    $('#input').hide();
                });
            });
            // Load labels into data set.
            const labels = ["cat", "dog", "fish", "horse", "bird", "reptile"];
            whichpet.addLabels(labels);
            // Load training set which should be pulled in with the fragment.
            for(let i = 0; i < pets.length; i++){
                whichpet.addData(pets[i].label, pets[i].description);
            }
        });
})();
