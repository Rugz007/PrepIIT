import { Button, Card, Col, Divider, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React from 'react'

interface TestIntructionProps {

}

export const TestIntruction: React.FC<TestIntructionProps> = () => {
    return (
        <Row style={{ minHeight: '96vh' }}>
            <Col span={4} />
            <Col span={16} >
                <Card style={{ height: '80%', marginTop: '4%', borderRadius: "17px" }}>
                    <Row>
                        <Col span={24}>
                            <h1 style={{ width: '100%', margin: 'auto', fontSize: '3.3rem' }}>Test Instructions</h1>
                            <Divider style={{ marginTop: '0' }} />
                        </Col>
                        <Col span={24}>
                            <p style={{textAlign:'left'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean odio odio, dignissim eget iaculis id, cursus id purus. In hac habitasse platea dictumst. Suspendisse vel leo vel tortor porttitor dignissim ac ut enim. Curabitur ultrices sit amet risus sed feugiat. Maecenas non sem massa. Sed blandit leo risus, eu commodo sem ultrices volutpat. In laoreet, quam eu tristique accumsan, purus est interdum lectus, finibus vulputate dui velit bibendum nisl. Cras vel nulla quis dui volutpat efficitur id nec odio. Nulla at nibh nisl. Praesent ornare fermentum nulla. Aenean dignissim quam vitae augue imperdiet accumsan. Nulla porttitor facilisis turpis, id eleifend nibh semper vel. Nunc non nunc ac ex ornare posuere quis a turpis. Nulla leo massa, tristique eu euismod blandit, tempus sit amet neque. Phasellus tempor euismod feugiat. In at tincidunt nibh.

                                Donec vehicula mollis nisi id tempus. Donec eget semper magna, vitae aliquam ipsum. Vestibulum aliquet tellus lacinia ante tempor, a rhoncus sapien suscipit. Integer et nisi tristique, eleifend orci ac, varius dui. Donec molestie orci elit, vel ultrices nibh ultrices eu. Maecenas ut orci velit. Donec ac turpis dolor. Nam quam nunc, commodo a velit a, pharetra tincidunt risus. Nunc faucibus eu risus id finibus. Suspendisse vel tristique risus. Donec dolor odio, vulputate eu lacus sed, auctor eleifend nisl. Morbi bibendum at lectus non sollicitudin. Sed tincidunt dui ac mattis dictum. Donec imperdiet leo id faucibus viverra. Nam magna justo, placerat ac urna in, egestas finibus libero.
                            </p>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'20%'}}>
                        <Col span={24}>
                            <Checkbox>I have read all the instructions stated above and I want to start the test!</Checkbox>

                        </Col>
                        <Col span={24}>
                            <Button type='primary' style={{width:'40%'}}>Start Test</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={4} />
        </Row>
    );
}