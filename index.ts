import { NativeModules } from 'react-native'

const { RNZoomUs } = NativeModules

if (!RNZoomUs) console.error('RNZoomUs native module is not linked.')

const DEFAULT_USER_TYPE = 2

export interface RNZoomUsInitializeParams {
  clientKey: string;
  clientSecret: string;
  domain?: string
}
async function initialize(
  params: RNZoomUsInitializeParams,
  settings: {
    // ios only
    disableShowVideoPreviewWhenJoinMeeting?: boolean
  } = {
    // more details inside: https://github.com/mieszko4/react-native-zoom-us/issues/28
    disableShowVideoPreviewWhenJoinMeeting: true,
  },
) {
  if (typeof params !== 'object') {
    throw new Error(
      'ZoomUs.initialize expects object param. Consider to check migration docs. ' +
        'Check Link: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/UPGRADING.md',
    )
  }

  if (!params.domain) params.domain = 'zoom.us'

  return RNZoomUs.initialize(params, settings)
}

export interface RNZoomUsJoinMeetingParams {
  userName: string
  meetingNumber: string | number
  password?: string
  participantID?: string
  noAudio?: boolean
  noVideo?: boolean

  // ios only fields:
  zoomAccessToken?: string
  webinarToken?: string
}
async function joinMeeting(params: RNZoomUsJoinMeetingParams) {
  let { meetingNumber, noAudio = false, noVideo = false } = params
  if (!meetingNumber) throw new Error('ZoomUs.joinMeeting requires meetingNumber')
  if (typeof meetingNumber !== 'string') meetingNumber = meetingNumber.toString()

  // without noAudio, noVideo fields SDK can stack on joining meeting room for release build
  return RNZoomUs.joinMeeting({
    ...params,
    meetingNumber,
    noAudio: !!noAudio, // required
    noVideo: !!noVideo, // required
  })
}

async function joinMeetingWithPassword(...params) {
  console.warn("ZoomUs.joinMeetingWithPassword is deprecated. Use joinMeeting({ password: 'xxx', ... })")
  return RNZoomUs.joinMeetingWithPassword(...params)
}

export interface RNZoomUsStartMeetingParams {
  userName: string
  meetingNumber: string | number
  userId: string
  userType?: number // looks like can be different for IOS and Android
  zoomAccessToken: string
}
async function startMeeting(params: RNZoomUsStartMeetingParams) {
  let { userType = DEFAULT_USER_TYPE, meetingNumber } = params

  if (!meetingNumber) throw new Error('ZoomUs.startMeeting requires meetingNumber')
  if (typeof meetingNumber !== 'string') meetingNumber = meetingNumber.toString()

  return RNZoomUs.startMeeting({ userType, ...params, meetingNumber })
}

export default {
  ...RNZoomUs,
  initialize,
  joinMeeting,
  joinMeetingWithPassword,
  startMeeting,
}
