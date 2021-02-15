import { Avatar, Card, Col, Divider, Row } from 'antd';
import React from 'react'

interface BlogPageProps {

}

export const BlogPage: React.FC<BlogPageProps> = () => {

    return (
        <div>
            <Row style={{ minHeight: '40vh', marginTop: '3%' }}>
                <Col span={2} />
                <Col span={12} style={{ textAlign: 'left' }}>
                    <h1 style={{ fontSize: "2.3rem", margin: 'auto' }}>Blog Title</h1>
                    <img
                        style={{
                            width: "80%",
                            zIndex: 5,
                        }}
                        src='https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png'
                        alt="insertimage"
                    />
                </Col>
                <Col span={8} style={{ textAlign: 'left' }}>
                    <Card style={{ minHeight: '40vh', marginTop: '11%' }}>
                        <Row>
                            <h1><b>About the Author:</b></h1>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Avatar size={100} style={{ display: 'block', margin: 'auto' }} />
                                <h1 style={{ marginTop: '1%' }}>Rugved Somwanshi</h1>
                                <Divider />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo nibh sed lectus tempus gravida. Vestibulum sollicitudin commodo dui, at placerat ex malesuada eu. Maecenas placerat nibh vel mi interdum, ac ornare neque rhoncus. Maecenas cursus felis cursus velit auctor condimentum. Sed suscipit elementum lobortis. Nullam eu ipsum mattis quam vestibulum tincidunt. Ut feugiat turpis ut egestas consequat. Duis nec ligula sit amet elit vulputate dapibus. In hac habitasse platea dictumst. Fusce tempus justo vitae rhoncus volutpat. Suspendisse vehicula lacus tristique, posuere elit at, consectetur sem. Phasellus quis ultrices dolor, ac vehicula nulla.
                        </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={2} />
            </Row>
            <Row style={{marginTop:'1%',textAlign:'left'}}>
                <Col span={2}/>
                <Col span={20}>
                    <Card>


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo nibh sed lectus tempus gravida. Vestibulum sollicitudin commodo dui, at placerat ex malesuada eu. Maecenas placerat nibh vel mi interdum, ac ornare neque rhoncus. Maecenas cursus felis cursus velit auctor condimentum. Sed suscipit elementum lobortis. Nullam eu ipsum mattis quam vestibulum tincidunt. Ut feugiat turpis ut egestas consequat. Duis nec ligula sit amet elit vulputate dapibus. In hac habitasse platea dictumst. Fusce tempus justo vitae rhoncus volutpat. Suspendisse vehicula lacus tristique, posuere elit at, consectetur sem. Phasellus quis ultrices dolor, ac vehicula nulla.

Nullam dictum efficitur ante et volutpat. Duis at nisl laoreet, interdum enim molestie, lacinia massa. Etiam commodo lorem quis ullamcorper malesuada. Cras vel tellus eget sem fringilla imperdiet. Nullam ac nulla ligula. Maecenas mattis vestibulum odio nec viverra. Sed consequat, tortor vel convallis aliquet, nunc massa gravida felis, sit amet gravida enim leo eget elit. Aliquam aliquet massa sollicitudin porttitor pretium. Praesent vitae consequat justo, at vulputate urna. Maecenas gravida tempor suscipit.

Nunc vestibulum lacinia porta. Fusce vel ultrices odio, at elementum purus. Phasellus efficitur nisi nisi, a mollis ligula porta laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In non dapibus turpis. Curabitur sed porttitor tellus, ac dictum orci. Fusce dictum non massa convallis dignissim. Morbi aliquam nibh ac dapibus tristique. Fusce pulvinar viverra orci in tincidunt. Cras ante turpis, consequat dapibus pulvinar ac, pharetra quis est. Nam porttitor gravida turpis, sed euismod diam tristique et. Etiam non vulputate nulla. Praesent dapibus arcu elit, at rutrum mauris laoreet in.

Vivamus et neque vel ex iaculis vulputate. Praesent dapibus feugiat turpis, vel maximus ex tristique a. Donec a rhoncus libero. Fusce nec nisi nec eros pulvinar consectetur. Aliquam fringilla ipsum faucibus euismod dictum. Phasellus id purus lobortis, ornare purus sed, hendrerit lacus. Vivamus venenatis laoreet rutrum. Morbi feugiat diam a lectus aliquam, sit amet gravida urna congue.

Morbi est ex, molestie sed tempus non, rutrum in est. Proin scelerisque ac mi eget congue. Curabitur at auctor nibh. Fusce vestibulum, nulla quis vestibulum volutpat, eros neque placerat urna, ullamcorper imperdiet est orci et arcu. Curabitur in ante ex. Nunc quis mi lacinia, rutrum ex vel, vehicula mi. Suspendisse ex libero, varius sit amet sapien nec, suscipit interdum ex. Suspendisse molestie ultrices ornare. Duis quis pharetra eros, ac efficitur arcu. Donec dui sapien, eleifend et quam dictum, pulvinar ultricies arcu. Ut efficitur et orci et consequat. Sed nec porta tellus. Integer lacinia bibendum orci posuere sagittis. Maecenas bibendum ac enim a pharetra. Fusce feugiat ultrices orci ut finibus. 
                    </Card>
                </Col>
                <Col span={2}/>
            </Row>
        </div>

    );
}