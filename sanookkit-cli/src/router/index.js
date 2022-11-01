import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LearningResourceView from '../views/LearningResourceView.vue'
import TrackingView from '../views/TrackingView.vue'
import PDFShowView from '../views/PDFShowView.vue'
import LearningDetail from '../views/LearningResourceDetailView.vue'
import DashboardView from '@/views/backOffice/DashboardView.vue'
import ManageStudentView from '@/views/backOffice/ManageStudentView.vue'
import ManageLearningResourceView from '@/views/backOffice/ManageLearningResourceView.vue'
import ManageAdminView from '@/views/backOffice/ManageAdminView.vue'
import SigninView from '@/views/authentication/SigninView.vue'
import SignupView from '@/views/authentication/SignupView.vue'
import AboutBagView from '@/views/AboutBagView.vue'

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
    component: PDFShowView,
    meta: {
      auth: true
    }
  },
  {
    path: '/learning-resource',
    name: 'LearningDetail',
    component: LearningDetail,
    meta: {
      auth: true
    }
  },
  {
    path: '/about-bag',
    name: 'AboutBag',
    component: AboutBagView
  },
  {
    path: '/tracking',
    name: 'track my bag',
    component: TrackingView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/manage-student',
    name: 'ManageStudentView',
    component: ManageStudentView
  },
  {
    path: '/manage-learning-resource',
    name: 'ManageLearningResourceView',
    component: ManageLearningResourceView
  },
  {
    path: '/manage-admin',
    name: 'ManageAdminView',
    component: ManageAdminView
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

export default router
