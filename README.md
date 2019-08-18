> ## 🛠 Status: In Development
>
> LitElement Real World app is currently in development.
>
> See the list of Known Issues and TODOs, below, for updates.

# LitElement Real World app

### [Demo](https://lit-realworld.azurewebsites.net/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This LitElement Real World app is based on [PWA Starter Kit](https://pwa-starter-kit.polymer-project.org/) sample app.

The code is written in Typescript and the build is done with Webpack.
It is using Redux for state management.
And it uses Page.js for routing.

Shadow-DOM is disabled as it is relying on the external RealWorld app stylesheet.

It does support service workers, including offline access

## TODOs

- [x] Setup basic application architecture
- [x] Setup build pipeline
- [x] All functional features implemented (note: some minor tasks remaining related to loading/updating state)
- [ ] Setup unit testing
- [ ] Setup integration testing
- [ ] A variant with RxJS and redux-observable
- [ ] A variant with RxJS and Observable-Store
