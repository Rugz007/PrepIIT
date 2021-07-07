import { Button, Card, Col, Divider, Popconfirm, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useState } from 'react'

interface TestIntructionProps {
    readInstruct: ((e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void);
}

export const TestIntruction: React.FC<TestIntructionProps> = ({ readInstruct }) => {
    const [read, setRead] = useState(false)
    const onChange = (e: any) => {
        setRead(e)
    }
    return (
        <Row style={{ minHeight: '96vh' }}>
            <Col lg={4} />
            <Col lg={16} >
                <Card style={{ height: '80%', marginTop: '4%', borderRadius: "17px" }}>
                    <Row>
                        <Col lg={24} sm={24}  xs={24}>
                            <h1 style={{ width: '100%', margin: 'auto', fontSize: '3.3rem' }}>Test Instructions</h1>
                            <Divider style={{ marginTop: '0' }} />
                        </Col>
                        <Col lg={24} sm={24}  xs={24}>
                            <p style={{ textAlign: 'left' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean odio odio, dignissim eget iaculis id, cursus id purus. In hac habitasse platea dictumst. Suspendisse vel leo vel tortor porttitor dignissim ac ut enim. Curabitur ultrices sit amet risus sed feugiat. Maecenas non sem massa. Sed blandit leo risus, eu commodo sem ultrices volutpat. In laoreet, quam eu tristique accumsan, purus est interdum lectus, finibus vulputate dui velit bibendum nisl. Cras vel nulla quis dui volutpat efficitur id nec odio. Nulla at nibh nisl. Praesent ornare fermentum nulla. Aenean dignissim quam vitae augue imperdiet accumsan. Nulla porttitor facilisis turpis, id eleifend nibh semper vel. Nunc non nunc ac ex ornare posuere quis a turpis. Nulla leo massa, tristique eu euismod blandit, tempus sit amet neque. Phasellus tempor euismod feugiat. In at tincidunt nibh.

                                Donec vehicula mollis nisi id tempus. Donec eget semper magna, vitae aliquam ipsum. Vestibulum aliquet tellus lacinia ante tempor, a rhoncus sapien suscipit. Integer et nisi tristique, eleifend orci ac, varius dui. Donec molestie orci elit, vel ultrices nibh ultrices eu. Maecenas ut orci velit. Donec ac turpis dolor. Nam quam nunc, commodo a velit a, pharetra tincidunt risus. Nunc faucibus eu risus id finibus. Suspendisse vel tristique risus. Donec dolor odio, vulputate eu lacus sed, auctor eleifend nisl. Morbi bibendum at lectus non sollicitudin. Sed tincidunt dui ac mattis dictum. Donec imperdiet leo id faucibus viverra. Nam magna justo, placerat ac urna in, egestas finibus libero.
                            </p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20%' }}>
                        <Col lg={24} sm={24}  xs={24}>
                            <Checkbox onChange={onChange}>I have read all the instructions stated above and I want to start the test!</Checkbox>
                        </Col>
                        <Col lg={24} sm={24} xs={24}>
                            {read ?
                                <Popconfirm
                                    title="Are you sure you want to start the test?"
                                    onConfirm={readInstruct}
                                    okText="Yes"
                                    cancelText="No"> <Button type='primary' style={{ width: '40%' }}>Start Test</Button>
                                </Popconfirm> :
                                <Button type='primary' style={{ width: '40%' }} disabled>Start Test</Button>}

                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col lg={4} />
        </Row>
    );
}