
import { defineConfig } from "vite";
import {resolve} from 'path';

export default defineConfig({
    build:{
        rollupOptions: {
            input: {

                main : resolve(__dirname,"index.html"),  // Your main entry point ( e.g home page)
                about : resolve(__dirname,"about.html"), // additional HTML pages
                products : resolve(__dirname,"product.html"),
                contact : resolve(__dirname,"contact.html"),
                addToCart : resolve(__dirname,"addToCart.html"),

            }
        }
    }
})