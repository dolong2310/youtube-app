import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./_watchScreen.scss";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    getRelatedVideos,
    getVideoById,
} from "../../redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Helmet } from "react-helmet";

WatchScreen.propTypes = {};

function WatchScreen(props) {
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoById(id));
        dispatch(getRelatedVideos(id));
    }, [dispatch, id]);

    const { videos, loading: relatedVideosLoading } = useSelector(
        (state) => state.relatedVideos
    );

    const { video, loading } = useSelector((state) => state.selectedVideo);

    return (
        <Row>
            <Helmet>
                <title>{video?.snippet?.title}</title>
            </Helmet>
            <Col lg={8}>
                <div className="watchScreen__player">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title={video?.snippet?.title}
                        allowFullScreen
                        src={`https://www.youtube.com/embed/${id}`}
                    ></iframe>
                </div>

                {!loading ? (
                    <VideoMetaData video={video} videoId={id} />
                ) : (
                    <h6>LOADING ...</h6>
                )}

                <Comments
                    videoId={id}
                    totalComments={video?.statistics?.commentCount}
                />
            </Col>
            <Col lg={4}>
                {!loading ? (
                    videos
                        ?.filter((video) => video.snippet)
                        .map((video) => (
                            <VideoHorizontal
                                video={video}
                                key={video.id.videoId}
                            />
                        ))
                ) : (
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                        <Skeleton width="100%" height="130px" count={15} />
                    </SkeletonTheme>
                )}
            </Col>
        </Row>
    );
}

export default WatchScreen;
