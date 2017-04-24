import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Store = () => <h3>Store</h3>
const Courses = () => (
    <div>
        <h3>Courses</h3>
        <ul>
            <li><Link to="/courses/react">React</Link></li>
            <li><Link to="/courses/greensock">GreenSock</Link></li>
        </ul>
        {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
        ))}
    </div>
)

const ReactCourse = () => <h3>React</h3>
const GreenSock = () => <h3>GreenSock</h3>

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  { path: '/store',
    component: Store
  },
  { path: '/courses',
    component: Courses,
    routes: [
      { path: '/courses/react',
        component: ReactCourse
      },
      { path: '/courses/greensock',
        component: GreenSock
      }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)


const App = () => (
    <Router>
        <div>
        <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/store">Store</Link></li>
        </ul>

        {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
        ))}
        </div>
    </Router>
)

export default App;