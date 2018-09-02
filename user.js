$(function () {
    //Get
    const url = 'http://localhost:3000/users/';

    let show = function () {
        axios.get(url)

            .then(function (el) {

                var tbodyEl = $('tbody');

                tbodyEl.html('');


                el.data.forEach(function (el) {
                    tbodyEl.append('\
                <tr>\
                    <td class="id">' + el.id + '</td>\
                    <td><input type="text" class="name" value="' + el.name + '"></td>\
                    <td><input type="text" class="email" value="' + el.email + '"></td>\
                    <td>\
                    <button class="update-button btn btn-outline-secondary btn btn-outline-warning">Edit</button>\
                    <button class="delete-button  btn btn-outline-secondary btn btn-outline-danger">Delete</i></button>\
                    </td>\
                </tr>\
            ');
                });

            }).catch(console.log);

    }

    //post

    $('#form').on('submit', (event) => {
        event.preventDefault();


        let userName = $("#userName");
        let mail = $("#Email");

        console.log(userName.val())


        axios.post(url, {
            name: userName.val(),
            email: mail.val()
        }).then((res) => {

            console.log(res)
        })
        show();
    });


    //put
    $("tbody").on("click", '.update-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        let userName = rowEl.find(".name").val();
        let mail = rowEl.find(".email").val();

        axios.put((url + id), {
            name: userName,
            email: mail


        })
            .then((res) => {

                console.log(res);
            })
        show();
    });

    $('table').on('click', '.delete-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);

        axios.delete(url + id)


            .then(function (response) {
                console.log(response[0]);
                show();
            })
    });
    show();
});

