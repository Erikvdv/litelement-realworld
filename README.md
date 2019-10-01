> ## 🛠 Status: In Development
>
> LitElement Real World app is currently in development.
>
> See the list of Known Issues and TODOs, below, for updates.

# LitElement Real World app

### [Demo](https://lit-realworld.azurewebsites.net/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This repository consists of two, LitElement based, versions of Real World app.

The code is written in Typescript and the build is done with Webpack.
It is using Redux for state management.

Shadow-DOM is disabled as it is relying on the external RealWorld app stylesheet.

It does support service workers, including offline access

The first app is based on redux thunk and uses Page.js for routing.

The second app is based on redux-observable. It is using typesafe-actions to simplify creation of actions.
It is using rxjs fetch for networking.



## TODOs

- [x] Setup basic application architecture
- [x] Setup build pipeline
- [x] All functional features implemented (note: some minor tasks remaining related to loading/updating state)
- [x] A variant with RxJS and redux-observable
- [x] A variant with RxJS and Observable-Store
- [ ] Setup unit testing
- [ ] Setup integration testing
- [ ] Setup differential loading for observable store app

