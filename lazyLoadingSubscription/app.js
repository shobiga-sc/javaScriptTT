document.addEventListener("DOMContentLoaded", () => {
    let currentSubscription = null; 
    const subscribe = (page) => {
        console.log(`Subscribed to updates for ${page}`);
        currentSubscription = {
            page,
            unsubscribe: () => {
                
                console.log(`Unsubscribed from ${page}`);
            },
        };
    };

    const unsubscribe = () => {
        if (currentSubscription && currentSubscription.unsubscribe) {
            currentSubscription.unsubscribe();
        }
        currentSubscription = null; 
    };

    const routes = {
        "/home": async () => {
            unsubscribe(); 
            subscribe("home"); 
            const module = await import("./pages/home.js");
            return module.default();
        },
        "/about": async () => {
            unsubscribe();
            subscribe("about");
            const module = await import("./pages/about.js");
            return module.default();
        },
        "/contact": async () => {
            unsubscribe();
            subscribe("contact");
            const module = await import("./pages/contact.js");
            return module.default();
        },
    };

    const navigateTo = async (path) => {
        if (!routes[path]) {
            path = '/home';
            history.replaceState(null, null, path);
        }
        console.log("Navigating to:", path);
        const contentDiv = document.getElementById("app");
       
        if (routes[path]) {
            try {
                const html = await routes[path](); 
                contentDiv.innerHTML = html; 
            } catch (error) {
                console.error("Error loading route:", error);
                contentDiv.innerHTML = "<h1>Error</h1><p>Failed to load the page.</p>";
            }
        } else {
            contentDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
        }
    };

    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            const path = `/${e.target.getAttribute("href")}`;
            history.pushState(null, null, path);
            navigateTo(path); 
        }
    });

    window.addEventListener("popstate", () => {
        navigateTo(window.location.pathname);
    });

 
    navigateTo(window.location.pathname);
});
