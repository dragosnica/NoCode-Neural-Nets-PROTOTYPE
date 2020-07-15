import * as ActionsTypes from '../../../constants/actionTypes';

const preloadedState = {
  projects: [],
  // projects: [{
  //   _id: '5ee0b042463e2c0bec351bf3', name: 'dragos7', networkType: 'sequential', lastSaved: '2020-06-10T10:04:50.355Z', createdAt: '2020-06-10T10:04:50.355Z'
  // }, {
  //   _id: '5ee0af985c220a0babbe4cc7', name: 'dragos6', networkType: 'sequential', lastSaved: '2020-06-10T10:02:00.256Z', createdAt: '2020-06-10T10:02:00.256Z'
  // }, {
  //   _id: '5ee0ac85000d150a847b4479', name: 'dragos5', networkType: 'sequential', lastSaved: '2020-06-10T09:48:53.467Z', createdAt: '2020-06-10T09:48:53.467Z'
  // }, {
  //   _id: '5ee0abd8000d150a847b4478', name: 'dragos4', networkType: 'sequential', lastSaved: '2020-06-10T09:46:00.913Z', createdAt: '2020-06-10T09:46:00.913Z'
  // }, {
  //   _id: '5ee0a9e7000d150a847b4477', name: 'dragos3', networkType: 'sequential', lastSaved: '2020-06-10T09:41:06.128Z', createdAt: '2020-06-10T09:37:43.561Z'
  // }, {
  //   _id: '5ee0a78bcb022f09e01bda98', name: 'dragos2', networkType: 'sequential', lastSaved: '2020-06-10T09:27:39.351Z', createdAt: '2020-06-10T09:27:39.351Z'
  // }, {
  //   _id: '5ee0a41c9f288a08ddab1c08', name: 'new_model10', networkType: 'sequential', lastSaved: '2020-06-10T09:13:00.258Z', createdAt: '2020-06-10T09:13:00.258Z'
  // }, {
  //   _id: '5ee0a3a89f288a08ddab1c07', name: 'dragos', networkType: 'sequential', lastSaved: '2020-06-10T09:11:04.452Z', createdAt: '2020-06-10T09:11:04.452Z'
  // }, {
  //   _id: '5ed8e39da4affc10fd50880f', name: 'new_model4', networkType: 'sequential', lastSaved: '2020-06-10T08:46:53.162Z', createdAt: '2020-06-04T12:05:49.407Z'
  // }, {
  //   _id: '5edf692b9e6cf30b954f064e', name: 'new_model9', networkType: 'sequential', lastSaved: '2020-06-09T15:57:35.251Z', createdAt: '2020-06-09T10:49:15.158Z'
  // }, {
  //   _id: '5edfab2ab4f88303f5c26172', name: 'new_model', networkType: 'sequential', lastSaved: '2020-06-09T15:53:54.589Z', createdAt: '2020-06-09T15:30:50.727Z'
  // }, {
  //   _id: '5edf68469e6cf30b954f064c', name: 'new_model7', networkType: 'sequential', lastSaved: '2020-06-09T10:45:26.794Z', createdAt: '2020-06-09T10:45:26.794Z'
  // }, {
  //   _id: '5edf68039e6cf30b954f064b', name: 'new_model8', networkType: 'sequential', lastSaved: '2020-06-09T10:44:19.810Z', createdAt: '2020-06-09T10:44:19.810Z'
  // }, {
  //   _id: '5edf623569dc5709ecb8d9db', name: 'new_model5', networkType: 'sequential', lastSaved: '2020-06-09T10:19:33.746Z', createdAt: '2020-06-09T10:19:33.746Z'
  // }, {
  //   _id: '5ed8e37ca4affc10fd50880e', name: 'new_model3', networkType: 'sequential', lastSaved: '2020-06-04T12:05:18.667Z', createdAt: '2020-06-04T12:05:16.519Z'
  // }, {
  //   _id: '5ed8e1f158f337106fd04435', name: 'new_model2', networkType: 'sequential', lastSaved: '2020-06-04T11:59:57.909Z', createdAt: '2020-06-04T11:58:41.042Z'
  // }, {
  //   _id: '5ed8e1cf58f337106fd04434', name: 'new_model6', networkType: 'sequential', lastSaved: '2020-06-04T11:58:09.771Z', createdAt: '2020-06-04T11:58:07.061Z'
  // }],
  projectsSetError: ''
};

const projects = (state = preloadedState, action) => {
  switch (action.type) {
    case ActionsTypes.SET_PROJECTS:
      return {
        projects: action.projects,
      };
    case ActionsTypes.SET_PROJECTS_FAILED:
      return {
        projectsSetError: action.error,
      };
    default:
      return state;
  }
};

export default projects;
