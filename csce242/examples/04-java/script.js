/* Say Hello Function 
function sayHello() {
    alert("Hello World");
}
/* When we load it we will call the sayHello function 
window.onload = sayHello;

/* Say Hello is the name of the function 
/* We are letting it equal the parameter list followed by whats inside the function 
let sayHello = () => {
    alert("Hello World");
};
window.onload = sayHello;

/* What you probably want to use 
window.onload = () => {
    alert("Hello World");
};

/* Never do 
window.onload = () => {
    document.write("hello world");
};
*/


