window.onload = function() {
    //variables created and some elements added to the HTML file
    var retrievedObject;
    var background = $('<img id="background">');
    var overlay = $('#overlay_text').append("<div id='artwork'></div>");
    var size = 'small';
    var allowedToExit=false;
    var override = false;
    //checks the name of the current page
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    var height;
    var width;
    //stores the windows dimensions for checking later on
    height = $(window).height();
    width = $(window).width();
    //displays the mobile menu if the screen size is small enough on the page loading
    if (width<589){
        document.getElementById("menu").style.display = "block";
    }
    else if(width>=589){
        document.getElementById("menu").style.display = "none";
    }
    //does the same as above but constantly checks whenever the window is re-sized
    var resize = $(window).resize(function() {
        // This will execute whenever the window is re-sized
        height = $(window).height(); // New height
        width = $(window).width(); // New width
        //Checks if the user is using a mobile device and if the page loaded is the customiser. Displays error message according to this
        if (width<589){
            if (override ===false && sPage==="CUSTOMISER.html") {
                document.getElementById("insert_image").style.display = "none";
                document.getElementById("information_text").style.display = "none";
                document.getElementById("not_allowed").style.display = "block";
            }
            document.getElementById("menu").style.display = "block";
        }
        else if(width>=589){
            document.getElementById("menu").style.display = "none";
            if (override ===false && sPage==="CUSTOMISER.html") {
                document.getElementById("insert_image").style.display = "block";
                document.getElementById("information_text").style.display = "block";
                document.getElementById("not_allowed").style.display = "none";
            }
        }
    });

    //checks if the customier page is loaded
    if (sPage==="CUSTOMISER.html") {
        //if an item exists in local storage (an album) the view album button is displayed
        if (localStorage.length > 0) {
            document.getElementById("view").style.display = "block";
        }
    }

    //each individual grid item in the discography and its song list is given a click event
    //The grid item is given an event which displays all the songs in the album by setting the overlay to display block
    //the overlay is given an event which closes it
    $(".grid-item-1").click(function() {
        var x = document.getElementById("info-1")
        x.style.display = "block";

    });
    $("#text-1").click(function(){
        var x = document.getElementById("info-1")
        x.style.display = "none";
    });

    $(".grid-item-2").click(function() {
        var x = document.getElementById("info-2")
        x.style.display = "block";

    });
    $("#text-2").click(function(){
        var x = document.getElementById("info-2")
        x.style.display = "none";
    });

    $(".grid-item-3").click(function() {
        var x = document.getElementById("info-3")
        x.style.display = "block";

    });
    $("#text-3").click(function(){
        var x = document.getElementById("info-3")
        x.style.display = "none";
    });

    $(".grid-item-4").click(function() {
        var x = document.getElementById("info-4")
        x.style.display = "block";

    });
    $("#text-4").click(function(){
        var x = document.getElementById("info-4")
        x.style.display = "none";
    });

    $(".grid-item-5").click(function() {
        var x = document.getElementById("info-5")
        x.style.display = "block";

    });
    $("#text-5").click(function(){
        var x = document.getElementById("info-5")
        x.style.display = "none";
    });

    //If the user clicks finis this will be triggered
    $("#confirm-button").click(function(event){
        event.preventDefault();
        //if no albums already exist the album is created
        if (localStorage.length===0) {
            createAlbum();
        }
        //if an album exists the user is asked if they wish to overwrite it
        else if (localStorage.length>0) {
            document.getElementById("confirmation").style.display="block";
            //if they wish to overwrite the album is created
            $("#Yes").off('click').on('click', function(event){
                event.preventDefault();
                createAlbum();
                document.getElementById("confirmation").style.display="none";
            });
            //if they dont wish to overwrite nothing happens and the confirmation box disappears
            $("#No").off('click').on('click', function(event){
                event.preventDefault();
                document.getElementById("confirmation").style.display="none";
            });
        }
    });

    //where the albums are created
    function createAlbum(){
        //checks if the user has selected any songs and displays an error message if they have not
        if ($("li input:checkbox:checked").length===0){
            alert("You have not selected any songs. Please select at least one song")
        }
        else if ($("li input:checkbox:checked").length>0) {
            //any album currently in local storage is removed
            localStorage.clear();
            //each song is added to a list
            var searchIDs = $("li input:checkbox:checked").map(function () {
                return $(this).val();
            }).get();
            //the list is added to local storage and then retrieved
            localStorage.setItem('searchIDs', JSON.stringify(searchIDs));
            retrievedObject = localStorage.getItem('searchIDs');
            var information = JSON.parse(retrievedObject);
            var information = searchIDs;
            //each song is then added to the overlay_text window
            $('#overlay_text').append("<ol id='newList'></ol>");
            for (var i = 0; i < information.length; i++) {
                //dependent on the amount of songs selected and the screen size depends on the size of window created and its position on the screen
                if (i > 18 && i < 24) {
                    size = 'normal';
                    if (width<=929 && width>770){
                        $('#overlay_text').css({
                            'width': '620px',
                            'height': '500px',
                            'transform': 'translate(150px,50px)'
                        });
                        $('#insert_image').attr('size', '42');

                    }
                    else if (width<=770 && width>589){
                        $('#overlay_text').css({
                            'width': '589px',
                            'height': '500px',
                            'transform': 'translate(0px,0px)'
                        });
                        $('#insert_image').attr('size', '37');

                    }
                    else if (width<=589){
                        $('#overlay_text').css({
                            'width': '100%',
                            'height': '500px',
                            'transform': 'translate(0px,5300px)'
                        });
                    }
                    else if(width>929){
                        $('#overlay_text').css({
                            'width': '620px',
                            'height': '500px',
                            'transform': 'translate(310px,50px)'
                        });
                        $('#insert_image').attr('size', '42');

                    }
                    $(window).resize(function() {
                        if (width<=929 && width>770){
                            $('#overlay_text').css({
                                'width': '620px',
                                'height': '500px',
                                'transform': 'translate(150px,50px)'
                            });
                            $('#insert_image').attr('size', '42');

                        }
                        else if (width<=770 && width>589){
                            $('#overlay_text').css({
                                'width': '589px',
                                'height': '500px',
                                'transform': 'translate(0px,0px)'
                            });
                            $('#insert_image').attr('size', '37');

                        }
                        else if (width<=589){
                            $('#overlay_text').css({
                                'width': '100%',
                                'height': '500px',
                                'transform': 'translate(0px,5300px)'
                            });
                        }
                        else if(width>929){
                            $('#overlay_text').css({
                                'width': '620px',
                                'height': '500px',
                                'transform': 'translate(310px,50px)'
                            });
                            $('#insert_image').attr('size', '42');

                        }
                    });
                }
                else if (i >= 24 && i < 34) {
                    size = 'medium';
                    if (width <= 1025 && width>900) {
                        $('#overlay_text').css({
                            'width': '800px',
                            'height': '700px',
                            'transform': 'translate(100px,50px)'
                        })

                        $('#insert_image').attr('size', '69');
                    }
                    else if (width <= 900 && width>850) {
                        $('#overlay_text').css({
                            'width': '800px',
                            'height': '700px',
                            'transform': 'translate(50px,50px)'
                        })

                        $('#insert_image').attr('size', '69');
                    }
                    else if (width <= 850 && width>589) {
                        $('#overlay_text').css({
                            'font-size':'15px',
                            'width': '589px',
                            'height': '650px',
                            'transform': 'translate(0px,0px)'
                        })

                        $('#insert_image').attr('size', '40');
                    }
                    else if (width <=589) {
                        $('#overlay_text').css({
                            'font-size':'15px',
                            'width': '100%',
                            'height': '650px',
                            'transform': 'translate(0px,5200px)'
                        });

                    }
                    else if (width>1025) {
                        $('#overlay_text').css({
                            'width': '800px',
                            'height': '700px',
                            'transform': 'translate(225px,50px)'
                        })
                        $('#insert_image').attr('size', '69');
                    }
                    $(window).resize(function() {
                        if (width <= 1025 && width>900) {
                            $('#overlay_text').css({
                                'width': '800px',
                                'height': '700px',
                                'transform': 'translate(100px,50px)'
                            })

                            $('#insert_image').attr('size', '69');
                        }
                        else if (width <= 900 && width>850) {
                            $('#overlay_text').css({
                                'width': '800px',
                                'height': '700px',
                                'transform': 'translate(50px,50px)'
                            })

                            $('#insert_image').attr('size', '69');
                        }
                        else if (width <= 850 && width>589) {
                            $('#overlay_text').css({
                                'font-size':'15px',
                                'width': '589px',
                                'height': '650px',
                                'transform': 'translate(0px,0px)'
                            })

                            $('#insert_image').attr('size', '40');
                        }
                        else if (width <=589) {
                            $('#overlay_text').css({
                                'font-size':'15px',
                                'width': '100%',
                                'height': '650px',
                                'transform': 'translate(0px,5200px)'
                            });

                        }
                        else if(width>1025) {
                            $('#overlay_text').css({
                                'width': '800px',
                                'height': '700px',
                                'transform': 'translate(225px,50px)'
                            })
                            $('#insert_image').attr('size', '69');
                        }
                    });
                }
                else if (i > 34 && i <= 46) {
                    size='big';
                    if (width<=1129 && width>1050){
                        $('#overlay_text').css({
                            'width': '1000px',
                            'height': '900px',
                            'transform': 'translate(50px,50px)'
                        })
                        $('#insert_image').attr('size', '99');
                    }
                    else if (width<=1050 && width>589){
                        $('#overlay_text').css({
                            'width': '589px',
                            'font-size':'10px',
                            'height': '550px',
                            'transform': 'translate(0px,0px)'
                        })
                        $('#insert_image').attr('size', '52');
                    }
                    else if (width<=589){
                        $('#overlay_text').css({
                            'width': '100%',
                            'font-size':'10px',
                            'height': '550px',
                            'transform': 'translate(0px,5200px)'
                        })
                        $('#insert_image').attr('size', '52');
                    }
                    else if(width>1129){
                        $('#overlay_text').css({
                            'width': '1000px',
                            'height': '900px',
                            'transform': 'translate(130px,50px)'
                        })
                        $('#insert_image').attr('size', '99');
                    }
                    $(window).resize(function() {
                        if (width<=1129 && width>1050){
                            $('#overlay_text').css({
                                'width': '1000px',
                                'height': '900px',
                                'transform': 'translate(50px,50px)'
                            })
                            $('#insert_image').attr('size', '99');
                        }
                        else if (width<=1050 && width>589){
                            $('#overlay_text').css({
                                'width': '589px',
                                'font-size':'10px',
                                'height': '550px',
                                'transform': 'translate(0px,0px)'
                            })
                            $('#insert_image').attr('size', '52');
                        }
                        else if (width<=589){
                            $('#overlay_text').css({
                                'width': '100%',
                                'font-size':'10px',
                                'height': '550px',
                                'transform': 'translate(0px,5200px)'
                            })
                            $('#insert_image').attr('size', '52');
                        }
                        else if(width>1129){
                            $('#overlay_text').css({
                                'width': '1000px',
                                'height': '900px',
                                'transform': 'translate(130px,50px)'
                            })
                            $('#insert_image').attr('size', '99');
                        }
                    });
                }
                if (i > 46) {
                    size = 'huge';
                    if (width<=1230 && width>844) {
                        $('#overlay_text').css({
                            'width': '844px',
                            'height': '700px',
                            'transform': 'translate(0px,0px)',
                            'font-size':'10px'
                        });
                        $('#insert_image').attr('size', '90');
                    }
                    else if(width<=844){
                        $('#overlay_text').css({
                            'width': '100%',
                            'height': '700px',
                            'transform': 'translate(0px,5000px)'
                        });
                        $('#insert_image').attr('size', '50');
                    }
                    else if(width>1230){
                        $('#overlay_text').css({
                            'width': '1200px',
                            'height': '1150px',
                            'transform': 'translate(30px,50px)'
                        });
                        $('#insert_image').attr('size', '129');
                    }
                    $(window).resize(function() {
                        if (width<=1230 && width>844) {
                            $('#overlay_text').css({
                                'width': '844px',
                                'height': '700px',
                                'transform': 'translate(0px,0px)',
                                'font-size':'10px'
                            });
                            $('#insert_image').attr('size', '90');
                        }
                        else if(width<=844){
                            $('#overlay_text').css({
                                'width': '100%',
                                'height': '700px',
                                'transform': 'translate(0px,5000px)'
                            });
                            $('#insert_image').attr('size', '50');
                        }
                        else if(width>1230){
                            $('#overlay_text').css({
                                'width': '1200px',
                                'height': '1150px',
                                'transform': 'translate(30px,50px)'
                            });
                            $('#insert_image').attr('size', '129');
                        }
                    });

                }
                //the song is added to an li element then added to the list and the list is then added to the over_text window
                var item = document.createElement('li');
                var tempo = item.append(information[i]);
                $('#newList').append(item);
            }
            //the list is moved away from the window border
            $('#newList').css({
                'transform': 'translate(0px,10px)'
            });
            //makes sure the correct elements are displayed as they may have been set to display none thanks to the view function
            document.getElementById("overlay_text").style.display = "block";
            document.getElementById("overlay").style.display = "block";
            document.getElementById("ok_button").style.display = "block";
            document.getElementById("insert_image").style.display = "block";
            document.getElementById("information_text").style.display = "block";
        }
    }
    //checks an image exists
    function checkImageExists(imageUrl, callBack) {
        var imageData = new Image();
        imageData.onload = function() {
            callBack(true);
        };
        imageData.onerror = function() {
            callBack(false);
        };
        imageData.src = imageUrl;
    }

    //Adds album artwork to the overlay_window but it first uses the above function to check if the image provided exists
    $('#ok_button').click(function(){
        var inp = $('#insert_image').val();
        $("#background").remove()
        background = $('<img id="background">');
        //allows user to enter nothing in the artwork section
        if (inp.length>0) {
            checkImageExists(inp, function (existsImage) {
                if (existsImage == true) {
                    localStorage.setItem('artwork', JSON.stringify(inp));
                    background.attr('src', inp);
                    addArtwork();
                }
                else {
                    alert('image does not exist')
                }
            });
        }
        //allows user to exit window
        allowedToExit = true;
    });

    //adds artwork to the window at the correct size of that window
    function addArtwork() {
        background.appendTo('#artwork');
        if(size==='small') {
            $('#artwork').css({
                'position': 'absolute',
                'top': '0',
                'height': '400px',
                'width': '100%',
                'z-index': '-1'

            });
        }
        else if(size==='normal'){
            $('#artwork').css({
                'position': 'absolute',
                'top': '0',
                'height': '500px',
                'width': '100%',
                'z-index': '-1'

            });
        }
        else if(size==='medium'){

            $('#artwork').css({
                'position': 'absolute',
                'top': '0',
                'height': '100%',
                'width': '100%',
                'z-index': '-1'

            });
        }
        else if(size==='big'){
            $('#artwork').css({
                'position': 'absolute',
                'top': '0',
                'height': '100%',
                'width': '100%',
                'z-index': '-1'

            });
        }
        else if(size==='huge'){
            $('#artwork').css({
                'position': 'absolute',
                'top': '0',
                'height': '100%',
                'width': '100%',
                'z-index': '-1'

            });
        }
        $('#background').css({
            'height': '100%',
            'width': '100%'
        });
    }
    //triggered when view album is clicked
    $('#view').click(function(){
        //set to true to allow the user to exit without clicking 'ok'
        override = true;
        //the same as create album
        retrievedObject = localStorage.getItem('searchIDs');
        var value = JSON.parse(retrievedObject);
        var image = JSON.parse(localStorage.getItem('artwork'));
        background.attr('src', image);
        $('#overlay_text').append("<ol id='newList'></ol>");
        for (var i = 0; i < value.length; i++) {
            if (i > 18 && i < 24) {
                size = 'normal';
                if (width<=929 && width>770){
                    $('#overlay_text').css({
                        'width': '620px',
                        'height': '500px',
                        'transform': 'translate(150px,50px)'
                    });
                    $('#insert_image').attr('size', '42');

                }
                else if (width<=770 && width>589){
                    $('#overlay_text').css({
                        'width': '589px',
                        'height': '500px',
                        'transform': 'translate(0px,0px)'
                    });
                    $('#insert_image').attr('size', '37');

                }
                else if (width<=589){
                    $('#overlay_text').css({
                        'width': '100%',
                        'height': '500px',
                        'transform': 'translate(0px,5300px)'
                    });
                }
                else if(width>929){
                    $('#overlay_text').css({
                        'width': '620px',
                        'height': '500px',
                        'transform': 'translate(310px,50px)'
                    });
                    $('#insert_image').attr('size', '42');

                }
                $(window).resize(function() {
                    if (width<=929 && width>770){
                        $('#overlay_text').css({
                            'width': '620px',
                            'height': '500px',
                            'transform': 'translate(150px,50px)'
                        });
                        $('#insert_image').attr('size', '42');

                    }
                    else if (width<=770 && width>589){
                        $('#overlay_text').css({
                            'width': '589px',
                            'height': '500px',
                            'transform': 'translate(0px,0px)'
                        });
                        $('#insert_image').attr('size', '37');

                    }
                    else if (width<=589){
                        $('#overlay_text').css({
                            'width': '100%',
                            'height': '500px',
                            'transform': 'translate(0px,5300px)'
                        });
                    }
                    else if(width>929){
                        $('#overlay_text').css({
                            'width': '620px',
                            'height': '500px',
                            'transform': 'translate(310px,50px)'
                        });
                        $('#insert_image').attr('size', '42');

                    }
                });
            }
            else if (i >= 24 && i < 34) {
                size = 'medium';
                if (width <= 1025 && width>900) {
                    $('#overlay_text').css({
                        'width': '800px',
                        'height': '700px',
                        'transform': 'translate(100px,50px)'
                    })

                    $('#insert_image').attr('size', '69');
                }
                else if (width <= 900 && width>850) {
                    $('#overlay_text').css({
                        'width': '800px',
                        'height': '700px',
                        'transform': 'translate(50px,50px)'
                    })

                    $('#insert_image').attr('size', '69');
                }
                else if (width <= 850 && width>589) {
                    $('#overlay_text').css({
                        'font-size':'15px',
                        'width': '589px',
                        'height': '650px',
                        'transform': 'translate(0px,0px)'
                    })

                    $('#insert_image').attr('size', '40');
                }
                else if (width <=589) {
                    $('#overlay_text').css({
                        'font-size':'15px',
                        'width': '100%',
                        'height': '650px',
                        'transform': 'translate(0px,5200px)'
                    });

                }
                else if (width>1025) {
                    $('#overlay_text').css({
                        'width': '800px',
                        'height': '700px',
                        'transform': 'translate(225px,50px)'
                    })
                    $('#insert_image').attr('size', '69');
                }
                $(window).resize(function() {
                    if (width <= 1025 && width>900) {
                        $('#overlay_text').css({
                            'width': '800px',
                            'height': '700px',
                            'transform': 'translate(100px,50px)'
                        })

                        $('#insert_image').attr('size', '69');
                    }
                    else if (width <= 900 && width>850) {
                        $('#overlay_text').css({
                            'width': '800px',
                            'height': '700px',
                            'transform': 'translate(50px,50px)'
                        })

                        $('#insert_image').attr('size', '69');
                    }
                    else if (width <= 850 && width>589) {
                        $('#overlay_text').css({
                            'font-size':'15px',
                            'width': '589px',
                            'height': '650px',
                            'transform': 'translate(0px,0px)'
                        })

                        $('#insert_image').attr('size', '40');
                    }
                    else if (width <=589) {
                        $('#overlay_text').css({
                            'font-size':'15px',
                            'width': '100%',
                            'height': '650px',
                            'transform': 'translate(0px,5200px)'
                        });

                    }
                    else if(width>1025) {
                        $('#overlay_text').css({
                            'width': '800px',
                            'height': '700px',
                            'transform': 'translate(225px,50px)'
                        })
                        $('#insert_image').attr('size', '69');
                    }
                });
            }
            else if (i > 34 && i <= 46) {
                size='big';
                if (width<=1129 && width>1050){
                    $('#overlay_text').css({
                        'width': '1000px',
                        'height': '900px',
                        'transform': 'translate(50px,50px)'
                    })
                    $('#insert_image').attr('size', '99');
                }
                else if (width<=1050 && width>589){
                    $('#overlay_text').css({
                        'width': '589px',
                        'font-size':'10px',
                        'height': '550px',
                        'transform': 'translate(0px,0px)'
                    })
                    $('#insert_image').attr('size', '52');
                }
                else if (width<=589){
                    $('#overlay_text').css({
                        'width': '100%',
                        'font-size':'10px',
                        'height': '550px',
                        'transform': 'translate(0px,5200px)'
                    })
                    $('#insert_image').attr('size', '52');
                }
                else if(width>1129){
                    $('#overlay_text').css({
                        'width': '1000px',
                        'height': '900px',
                        'transform': 'translate(130px,50px)'
                    })
                    $('#insert_image').attr('size', '99');
                }
                $(window).resize(function() {
                    if (width<=1129 && width>1050){
                        $('#overlay_text').css({
                            'width': '1000px',
                            'height': '900px',
                            'transform': 'translate(50px,50px)'
                        })
                        $('#insert_image').attr('size', '99');
                    }
                    else if (width<=1050 && width>589){
                        $('#overlay_text').css({
                            'width': '589px',
                            'font-size':'10px',
                            'height': '550px',
                            'transform': 'translate(0px,0px)'
                        })
                        $('#insert_image').attr('size', '52');
                    }
                    else if (width<=589){
                        $('#overlay_text').css({
                            'width': '100%',
                            'font-size':'10px',
                            'height': '550px',
                            'transform': 'translate(0px,5200px)'
                        })
                        $('#insert_image').attr('size', '52');
                    }
                    else if(width>1129){
                        $('#overlay_text').css({
                            'width': '1000px',
                            'height': '900px',
                            'transform': 'translate(130px,50px)'
                        })
                        $('#insert_image').attr('size', '99');
                    }
                });
            }
            if (i > 46) {
                size = 'huge';
                if (width<=1230 && width>844) {
                    $('#overlay_text').css({
                        'width': '844px',
                        'height': '700px',
                        'transform': 'translate(0px,0px)',
                        'font-size':'10px'
                    });
                    $('#insert_image').attr('size', '90');
                }
                else if(width<=844){
                    $('#overlay_text').css({
                        'width': '100%',
                        'height': '700px',
                        'transform': 'translate(0px,5000px)'
                    });
                    $('#insert_image').attr('size', '50');
                }
                else if(width>1230){
                    $('#overlay_text').css({
                        'width': '1200px',
                        'height': '1150px',
                        'transform': 'translate(30px,50px)'
                    });
                    $('#insert_image').attr('size', '129');
                }
                $(window).resize(function() {
                    if (width<=1230 && width>844) {
                        $('#overlay_text').css({
                            'width': '844px',
                            'height': '700px',
                            'transform': 'translate(0px,0px)',
                            'font-size':'10px'
                        });
                        $('#insert_image').attr('size', '90');
                    }
                    else if(width<=844){
                        $('#overlay_text').css({
                            'width': '100%',
                            'height': '700px',
                            'transform': 'translate(0px,5000px)'
                        });
                        $('#insert_image').attr('size', '50');
                    }
                    else if(width>1230){
                        $('#overlay_text').css({
                            'width': '1200px',
                            'height': '1150px',
                            'transform': 'translate(30px,50px)'
                        });
                        $('#insert_image').attr('size', '129');
                    }
                });

            }
            var item = document.createElement('li');
            item.append(value[i]);
            $('#newList').append(item);
        }
        $('#newList').css({
            'transform': 'translate(0px,10px)'
        });
        //removed ok button, artwork text box and information that goes with it
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay_text").style.display = "block";
        document.getElementById("ok_button").style.display = "none";
        document.getElementById("insert_image").style.display = "none";
        document.getElementById("information_text").style.display = "none";
        addArtwork();
    });

    //triggered when the exit button is clicked
    $('#exit').click(function(){
        //if the user has clicked ok or if they are on the view window they will be allowed to exit
        //overlay and overlay_text vanish, the list and the artwork are removed and the checkboxes are un-ticked
        if (allowedToExit===true || override===true) {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("overlay_text").style.display = "none";
            $('#newList').remove();
            $('#background').remove();
            $('li input:checkbox').prop('checked', false);

        }
        //if they are not allowed to exit an error message is displayed
        else if(allowedToExit===false){
            alert("Please click 'ok' even if you are not submitting an album cover")
        }
        //if the user has created an album the view button is displayed
        if (localStorage.length>0) {
            document.getElementById("view").style.display="block";
        }
        //variables set to their default values
        allowedToExit = false;
        override = false;
    });

    //only triggered if the photos page is loaded
    if (sPage==="PHOTOS.html") {

        var slideIndex = 1;
        showSlides(slideIndex);

        //goes to the previous image
        $('.prev').click(function () {
            showSlides(slideIndex += -1)
        })
        //goes to the next image
        $('.next').click(function () {
            showSlides(slideIndex += 1)
        })

        //When each thumbnail is clicked it is then displayed in the main image container by switching the slide index(photo number) equal to its position
        $('#nail-1').click(function () {
            showSlides(slideIndex = 1)
        })
        $('#nail-2').click(function () {
            showSlides(slideIndex = 2)
        })
        $('#nail-3').click(function () {
            showSlides(slideIndex = 3)
        })
        $('#nail-4').click(function () {
            showSlides(slideIndex = 4)
        })
        $('#nail-5').click(function () {
            showSlides(slideIndex = 5)
        })
        $('#nail-6').click(function () {
            showSlides(slideIndex = 6)
        })
        $('#nail-7').click(function () {
            showSlides(slideIndex = 7)
        })
        $('#nail-8').click(function () {
            showSlides(slideIndex = 8)
        })
        $('#nail-9').click(function () {
            showSlides(slideIndex = 9)
        })
        $('#nail-10').click(function () {
            showSlides(slideIndex = 10)
        })
        $('#nail-11').click(function () {
            showSlides(slideIndex = 11)
        })
        $('#nail-12').click(function () {
            showSlides(slideIndex = 12)
        })
        $('#nail-13').click(function () {
            showSlides(slideIndex = 13)
        })
        $('#nail-14').click(function () {
            showSlides(slideIndex = 14)
        })
        $('#nail-15').click(function () {
            showSlides(slideIndex = 15)
        })

        //cycles through the photos to display the correct one at that position
        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("photo");
            var dots = document.getElementsByClassName("demo");
            var captionText = document.getElementById("caption");
            if (n > slides.length) {
                slideIndex = 1
            }
            if (n < 1) {
                slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
            captionText.innerHTML = dots[slideIndex - 1].alt;
        }
    }

    //displays the menu when clicked
    $('#menu').click(function(){
        document.getElementById("mySidenav").style.width = "250px";
    })
    //closes menu when exit icon is clicked
    $('#close').click(function(){
        document.getElementById("mySidenav").style.width = "0";
    })
};


