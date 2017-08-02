//upload images variable
var selectedFiles;
//array with upload images href`s
var uploadImages = [];

$('#file-upload').on('change', function (e) {

    //check if images are allready upload
    if(uploadImages.length <= 10) {
        //check if all input files are not greater then 10
        if (e.target.files.length <= 10 - uploadImages.length) {
            selectedFiles = e.target.files;
            //create url to images
            readURL(this);

            for (let i = 0; i < selectedFiles.length; i++) {
                uploadImages.push(selectedFiles[i]);
                // (function (i) {
                //     var filename = selectedFile[i].name;
                //     //обращение к базе данных
                //     //создать имя файла для сохранения, в данном случае имя - исходное имя файла
                //     var uploadsRef = firebase.storage().ref('storage/uploads/' + filename);
                //
                //     var uploadTask = uploadsRef.put(selectedFile[i]);
                //     var index = i;
                //
                //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                //         function (snapshot) {
                //             var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed();
                //             if ($(`#load-image-${index}`).next()[0]) {
                //                 $(`#load-image-${index}`).next()[0].innerText = `Загрузка: ${progress} %`;
                //             }
                //         }, function (error) {
                //             console.log(error.message)
                //         }, function () {
                //             //success
                //             console.log(uploadTask.snapshot.downloadURL);
                //             $(`#load-image-${index}`).attr('src', uploadTask.snapshot.downloadURL);
                //             uploadImages.push(uploadTask.snapshot.downloadURL);
                //             console.log(uploadImages)
                //         }
                //     );
                //
                // })(i)

            }
            console.log(uploadImages)
        }
    }
});


//load path for upload images
function readURL(input) {
    console.log('input', input);
    // if(uploadImages.length > 0){
    //     $('#images').find( "div" ).remove();
    //     for(let i = 0; i < uploadImages.length; i++) {
    //         (function (i) {
    //             var reader = new FileReader();
    //             reader.onload = function (e) {
    //                 // $('#images')
    //                 //     .append(`<div style="position:relative">`+
    //                 //         `<img src="${uploadImages[i]}" id="load-image-${i}" style="width:100px;height:100px;margin:0 2px;border:2px solid #ffdd22;">`+
    //                 //         `<p style="position:absolute;top:50%;"></p>`+
    //                 //         `</div>`);
    //
    //             }
    //             // reader.readAsDataURL(input.files[i]);
    //         })(i)
    //     }
    // }
};
