import HomeScreen from "../screen/home/HomeScreen";
import { navigationInterface } from "./NavigationContainer";
import NavbarTitleBackButton from "../components/shared/Navbar/NavbarTitleBackButton";
import SettingsScreen from "../screen/settings/SettingsScreen";
import NotificationsScreen from "../screen/notifications/NotificationsScreen";
import RoutineScreen from "../screen/routine/RoutineScreen";
import RoutineDetailsScreen from "../screen/routine_details/RoutineDetailsScreen";
import IncomeExpenditureScreen from "../screen/income_expenditure/IncomeExpenditureScreen";
import CurrentIncomeExpenditureScreen from "../screen/income_expenditure/CurrentIncomeExpenditureScreen";
import HistoryIncomeExpenditureScreen from "../screen/income_expenditure/HistoryIncomeExpenditureScreen";

import transactionsDefaultDB from '../db/transactions.json'
import SpecificMonthlyHistory from "../screen/income_expenditure/SpecificMonthlyHistory";
import SpecificSelectYear from "../screen/income_expenditure/SpecificSelectYear";
import DeveloperScreen from "../screen/developer/DeveloperScreen";

export default function Router(props: navigationInterface) {
    const { translate, navigation: { pathname, params } } = props
    const months: any = translate;
    const month = months[transactionsDefaultDB?.months?.find(r => r.id == new Date().getMonth())?.month?.toLocaleLowerCase() || '']
    const {
        settings,
        notifications,
        notes,
        routine,
        income_expenditure,
        income_expenditure_history
    } = translate
    const week_day: any = translate
    const router = [
        // /home
        {
            title: "Home",
            component: HomeScreen,
            link: "/home",
        },
        {
            title: "Developer",
            component: DeveloperScreen,
            link: "/developer",
        },

        // {
        //     title: "Notes",
        //     navbar: <NavbarTitleBackButton
        //         title={notes}
        //         key="notes_nav"
        //         backward="/home"
        //     />,
        //     component: RoutineScreen,
        //     link: "/notes",
        // },

        // {
        //     title: "Routine",
        //     navbar: <NavbarTitleBackButton
        //         title={routine}
        //         key="routine_nav"
        //         backward="/home"
        //     />,
        //     component: RoutineScreen,
        //     link: "/routine",
        // },

        // {
        //     title: "Routine",
        //     navbar: <NavbarTitleBackButton
        //         title={week_day[params?.day?.toLowerCase()]}
        //         key="routine_nav"
        //         backward="/routine"
        //     />,
        //     component: RoutineDetailsScreen,
        //     link: `/routine/${params?.routineID}`,
        // },

        {
            title: "Income Expenditure",
            link: "/income-expenditure",
            navbar: <NavbarTitleBackButton
                title={income_expenditure}
                key="income_expenditure_nav"
                backward="/home"
            />,
            component: IncomeExpenditureScreen
        },
        {
            title: "Income Expenditure Current",
            link: "/income-expenditure/current",
            navbar: <NavbarTitleBackButton
                title={month}
                key="income_expenditure_current_nav"
                backward="/income-expenditure"
            />,
            component: CurrentIncomeExpenditureScreen
        },
        {
            title: "Income Expenditure History",
            link: "/income-expenditure/history",
            navbar: <NavbarTitleBackButton
                title={income_expenditure_history}
                key="income_expenditure_history_nav"
                backward="/income-expenditure"
            />,
            component: HistoryIncomeExpenditureScreen
        },
        {
            title: "Income Expenditure History",
            link: `/income-expenditure/history/${params?.expensiveYear}`,
            navbar: <NavbarTitleBackButton
                title={`${income_expenditure_history}\n${params?.expensiveYear}`}
                key="income_expenditure_history_nav"
                backward="/income-expenditure/history"
            />,
            component: SpecificSelectYear
        },
        {
            title: "Income Expenditure History",
            link: `/income-expenditure/history/${params?.expensiveYear}/${params?.month}`,
            navbar: <NavbarTitleBackButton
                title={`${income_expenditure_history}\n${month} - ${params?.expensiveYear}`}
                key="income_expenditure_history_nav"
                backward={`/income-expenditure/history/${params?.expensiveYear}`}
            />,
            component: SpecificMonthlyHistory
        },
        // /notifications
        {
            title: "Notifications",
            link: "/notifications",
            navbar: <NavbarTitleBackButton
                title={notifications}
                key="notifications_nav"
                backward="/profile"
            />,
            component: NotificationsScreen
        },

        // /settings
        {
            title: "Settings",
            link: "/settings",
            navbar: <NavbarTitleBackButton
                title={settings}
                key="settings_nav"
                backward="/home"
            />,
            component: SettingsScreen
        },




    ];
    return router.find(component => component.link == pathname)
}