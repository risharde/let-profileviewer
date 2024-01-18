// PS. Some troll or drama queen from LET right now is going to be retentive about this code, I assure you.
// Original author: Risharde (rcloudsystems.com)
$(document).ready(function (){
    var profile_popup_status = false;
    // Go through each post
    $('body').find('.Author a.Username').each(function() {
        // Get relative link of user profile
        let href = $(this).attr('href');
        console.log('href', href);

        // Remove the link so we can create our own element that is clickable and stays in this window.
        // 1. Get parent first?
        var parent = $(this).parent();
        // 2. Remove link
        // link_element.remove();

        // Add new element
        var new_link_element = $('<div style="color: #358244; display: inline-block;" class="Username" data-url="' + href + '">(profile)</div>');
        parent.append(new_link_element); 
        new_link_element.click(function() {
          // console.log($(this).attr('data-url'));
          load_profile_popup($(this));
        });
    });

    if($('profile_popup_container').length == 0) {
      var html = '';
      html += '<div id="profile_popup_container" style="border: 10px solid #000000; width: 75%;position: fixed;top: 10%;left: 12.5%;max-height: 50%;overflow-y: scroll;background: #FFFFFF;color: #000000; border-radius: 3px;">';
      html += '<div id="profile_popup_container_close" style="z-index: 1000; cursor: pointer; background-color: white; color: black; position: absolute; right: 0; top: 0;border-radius: 3px; border: 1px solid #00000;">Close popup ❌</div>';
      html += '<div id="profile_popup_render" style="padding: 7px;"></div>';
      html += '</div>';
      var container = $(html);
      // Add it to the body, same PS as above I assume.
      $('body').append(container);
      // Then don't show it until someone decides to click on the profile link
      $(container).hide();

      $('#profile_popup_container_close').click(function () {
        console.log('click does not work');
        $('#profile_popup_container').hide();
        profile_popup_status = false;
      });

    }

    function load_profile_popup(element) {
      if (profile_popup_status == false) {
        $('#profile_popup_container').show();
        profile_popup_status = true;
      }
      // Really don't want to waste time on callbacks at the moment
      var data = $.ajax({
        url: $(element).attr('data-url'),
        method: 'GET',
        success: function (data) {
          var profile_page = $(data);
          var profile_container = $(profile_page).find('.Profile').clone();
          console.log(profile_container);
          $('#profile_popup_render').html('');
          $('#profile_popup_render').append(profile_container);
        },
        error: function (err) {
          alert('An issue occurred loading this profile. You must be logged in to view profiles. Either that of the profile page elements have changed and this plugin needs an update.');
        }
      });


    }
});