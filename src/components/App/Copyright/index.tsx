import * as React from 'react'

import Link from '@mui/material/Link';
import { Typography } from '@mui/material';


/**
 * Permet d'afficher une liste de messages
 */
const Copyright: React.FC<any> = (props:any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="http://adopteundev.fr">
            Adopteundev.fr
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
};

export default Copyright;