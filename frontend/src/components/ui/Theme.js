import { createMuiTheme } from '@material-ui/core/styles'
const arcPurple="#8e24aa"
const arcOrange="#e53935"
export default createMuiTheme({
    palette: {
      primary: {
        main: `${arcPurple}`,
      },
      secondary: {
        main: `${arcOrange}`,
      },
    },
    typography:{
      h4:{
        fontWeight:"300"
      },
      h1:{
        fontWeight:"300"
      },
    },
    
  });