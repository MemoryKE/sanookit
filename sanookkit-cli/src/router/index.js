import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LearningResourceView from '../views/LearningResourceView.vue'
import TrackingView from '../views/TrackingView.vue'
import PDFShowView from '../views/PDFShowView.vue'
import LearningDetail from '../views/LearningResourceDetailView.vue'
import DashboardView from '../views/backOffice/DashboardView.vue'
import ManageStudentView from '../views/backOffice/ManageStudentView.vue'
import ManageLearningResourceView from '../views/backOffice/ManageLearningResourceView.vue'
import ManageAdminView from '../views/backOffice/ManageAdminView.vue'
import SigninView from '../views/authentication/SigninView.vue'
import SignupView from '../views/authentication/SignupView.vue'
import AboutBagView from '../views/AboutBagView.vue'
import ManageCliAssetView from '../views/backOffice/ManageCliAssetView.vue'
import {
  scrkey
} from '../datas/localvalue.json'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/learning-resource',
    name: 'LearningResource',
    component: LearningResourceView
  },
  {
    path: '/learning-resource',
    name: 'PDFShowView',
    component: PDFShowView
  },
  {
    path: '/learning-resource',
    name: 'LearningDetail',
    component: LearningDetail
  },
  {
    path: '/about-bag',
    name: 'AboutBag',
    component: AboutBagView
  },
  {
    path: '/tracking',
    name: 'track my bag',
    component: TrackingView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-student',
    name: 'ManageStudentView',
    component: ManageStudentView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-learning-resource',
    name: 'ManageLearningResourceView',
    component: ManageLearningResourceView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-admin',
    name: 'ManageAdminView',
    component: ManageAdminView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage-cli-asset',
    name: 'ManageCliAssetView',
    component: ManageCliAssetView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView
  },
  {
    path: '/admin',
    name: 'adminSignin',
    component: SigninView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const CryptoJS = require("crypto-js")

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const access_token = localStorage.getItem('accessToken') || null
    var parseToken
    console.log(access_token)
    if (access_token != null) {
      const bytes = CryptoJS.AES.decrypt(access_token, scrkey)
      const originalText = bytes.toString(CryptoJS.enc.Utf8)
      parseToken = JSON.parse(originalText)
    }

    if ((parseToken?.role == 'normalUser' || 
    !access_token) && (
      to.name == "Dashboard" ||
      to.name == "ManageStudentView" ||
      to.name == "ManageLearningResourceView" ||
      to.name == "ManageAdminView" ||
      to.name == "ManageCliAssetView"
    )) {
      router.push({ name: 'adminSignin' })
    } else if (access_token == null) {
      router.push({ name: 'signin'})
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
