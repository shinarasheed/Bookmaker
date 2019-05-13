//listen for form submitio
const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;
    //when we submit the bookmarks to localStorage they will be submitted as an array of object. as key value pair
    if (!siteName || !siteUrl) {
        alert('fil in the form');
        //this line will stop the form from submitting 
        return false;
    }
    
    //it looks like this dosnt take care of http://
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert("please use a valid url");
        return false;
    } 


    const bookmark = {
        name: siteName,
        url:siteUrl
    }
    //if the array of books does not exist yet
    if (localStorage.getItem('bookmarks') === null) {
        //if the array dosent exist yet
        const bookmarks = [];
        bookmarks.push(bookmark);
        //set to localStorage
        //localStorage stores item as strings
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //if the array of bookmarks already exist
        //we need to parse the stored string to something we can use 
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //and save it back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear the form
    // siteName.value = '';
    // siteUrl.value = '';
    //we can just simply say
    document.getElementById('myForm').reset();

    fetchBookmarks();
}

//deleteBookmark
function deleteBookmark(url) {
    //fetch the bookmark from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (let i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //reset localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch bookmarks
    fetchBookmarks();

}

//Fectch bookmarks for display
function fetchBookmarks() {
    //get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output div
    const bookmarksResult = document.getElementById('bookmarksResult');
    //build the output
    bookmarksResult.innerHTML = '';
    bookmarks.forEach(function (bookmark) { 
        const name = bookmark.name;
        const url = bookmark.url
        bookmarksResult.innerHTML += 
        `<div class='card mx-auto' style="width:58%; padding:10px; margin-bottom: 10px;" >
        <h3>${name} <a href="${url}" class="btn btn-success btn-sm" target="_blank">visit</a>
        <a href="#" class="btn btn-danger btn-sm" onclick="deleteBookmark('${url}')">Delete</a>
        </h3>
        </div>`

    });   
}