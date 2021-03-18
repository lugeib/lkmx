let lstTodo = ['tarea 1', 'tarea 2'];

//Tried templates, but still confusing to me a little, on the functions rendering
// Vue.component('todo-item', {
//     props: ['todo'],
//     template: '<div class="row" style="padding-top: 5px;">\n' +
//         '                                        <div class="col-9">{{todo}}</div>\n' +
//         '                                        <div class="col-3">\n' +
//         '                                            <button class="btn btn-light btn-outline-dark"><img\n' +
//         '                                                    src="assets/img/icon-pen.svg"></button>\n' +
//         '                                            <button v-on:click="removeTodo({{todo}})" class="btn btn-light btn-outline-dark"><img\n' +
//         '                                                    src="assets/img/icon-trash.svg"></button>\n' +
//         '                                        </div>\n' +
//         '                                    </div>'
// });
var App = new Vue({
    el: '#main',
    data: {
        todos: lstTodo,
        newTodo: '',
        editedText: '',
        oldText: ''
    },
    methods: {
        updateTodo(todoUpd) {
            this.oldText = todoUpd;
            this.editedText = this.oldText;
            let element = $($(`input[todo='${todoUpd}']`)[0]);
            element.prev().hide();
            element.val(this.oldText);
            element.show();
            $($(`button[todo-save='${todoUpd}']`)).show();
            $($(`button[todo-edit='${todoUpd}']`)).hide();
            $($(`button[todo-del='${todoUpd}']`)).hide();
        },
        saveTodo() {
            console.log(`old text: ${this.oldText}`);
            console.log(`new text: ${this.editedText}`);
            this.todos[this.todos.indexOf(this.oldText)] = (this.editedText === '') ? this.oldText : this.editedText;

            let element = $($(`input[todo='${this.oldText}']`)[0]);
            element.prev().show();
            element.prev().text(this.editedText);
            element.hide();
            $($(`button[todo-save='${this.oldText}']`)).hide();
            $($(`button[todo-edit='${this.oldText}']`)).show();
            $($(`button[todo-del='${this.oldText}']`)).show();
            this.editedText = '';
        },
        addTodo() {
            if (this.newTodo === '')
                this.newTodo = 'Tarea vacía';

            this.todos.push(this.newTodo);
            this.newTodo = '';
            $('.hidden_input').hide();
            $('.hidden_disk').hide();
        },
        removeTodo(todoRemove) {
            this.todos = this.todos.filter(todo => {
                return todo !== todoRemove
            });
        }
    }
});

$('.hidden_input').hide();
$('.hidden_disk').hide();