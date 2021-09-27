// == Import : npm
import { render } from 'react-dom';
import * as dayjs from 'dayjs';
import * as calendar from 'dayjs/plugin/calendar';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';

// Configuration globale de dayjs

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat)
dayjs.updateLocale('fr', {
    calendar: {
        lastDay: '[Hier à] LT',
        sameDay: '[Aujourd\'hui à] LT',
        nextDay: '[Demain à] LT',
        lastWeek: 'dddd [dernier] [à] LT',
        nextWeek: 'dddd [à] LT',
        sameElse: 'L'
    }
});
dayjs.locale('fr');

// == Import : local
// Composants
import App from 'src/components/App';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = <App />;
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
