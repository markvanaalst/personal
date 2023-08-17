import {
  enrichTweet,
  QuotedTweet,
  TweetActions,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInfo,
  TweetInReplyTo,
  TweetMedia,
  type TwitterComponents,
} from 'react-tweet'
import type { Tweet } from 'react-tweet/api'

import cn from '@/lib/cn'

type Props = {
  tweet: Tweet
  components?: TwitterComponents
}

export const CustomTweet = ({ tweet: t, components }: Props) => {
  const tweet = enrichTweet(t)
  return (
    <TweetContainer className={cn('!mx-auto')}>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? (
        <TweetMedia tweet={tweet} components={components} />
      ) : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
      <TweetInfo tweet={tweet} />
      <TweetActions tweet={tweet} />
      {/* We're not including the `TweetReplies` component that adds the reply button */}
    </TweetContainer>
  )
}
