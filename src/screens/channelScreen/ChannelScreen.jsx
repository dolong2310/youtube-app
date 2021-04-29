import numeral from "numeral";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Video from "../../components/video/Video";
import { getChannelDetails } from "../../redux/actions/channel.action";
import { getVideosByChannel } from "../../redux/actions/videos.action";
import "./_channelScreen.scss";

function ChannelScreen(props) {
    const { channelId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosByChannel(channelId));
        dispatch(getChannelDetails(channelId));
    }, [dispatch, channelId]);

    const { videos, loading } = useSelector((state) => state.channelVideos);
    const { snippet, statistics } = useSelector(
        (state) => state.channelDetails.channel
    );

    return (
        <>
            <div className="channelHeader d-flex align-items-center justify-content-between px-5 py-2 my-2">
                <div className="channelHeader__left d-flex align-items-center">
                    <img src={snippet?.thumbnails?.default?.url} alt="" />

                    <div className="channelHeader__details ml-3">
                        <h3>{snippet?.title}</h3>

                        {numeral(statistics?.subscriberCount).format("0.a") !==
                            "0" && (
                            <span>
                                {numeral(statistics?.subscriberCount).format(
                                    "0.a"
                                )}
                                subscribers
                            </span>
                        )}
                    </div>
                </div>

                <button>subscribers</button>
            </div>
            <Container>
                <Row className="mt-2">
                    {!loading
                        ? videos?.map((video) => (
                              <Col md={4} lg={3} key={video.id}>
                                  <Video video={video} channelScreen />
                              </Col>
                          ))
                        : [...Array(15)].map((x, index) => (
                              <Col md={4} lg={3} key={index}>
                                  <SkeletonTheme
                                      color="#343a40"
                                      highlightColor="#3c4147"
                                  >
                                      <Skeleton width="100%" height="140px" />
                                  </SkeletonTheme>
                              </Col>
                          ))}
                </Row>
            </Container>
        </>
    );
}

export default ChannelScreen;
