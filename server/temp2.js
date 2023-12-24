const data = {
    "text": [
        {
            "bound": "hello1",
            "description": "desc1"
        },
        {
            "bound": "hello2",
            "description": "desc2"
        },
        {
            "bound": "hello3",
            "description": "desc3"
        }
    ]
}

const index = data.text.findIndex(item => item.description === "desc3");

// Check if the element was found
if (index !== -1) {
    console.log(`Index of element with description "desc2": ${index}`);
} else {
    console.log("Element not found");
}