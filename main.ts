import { Construct } from 'constructs';
import {
  App,
  TerraformStack,
  TerraformOutput,
} from 'cdktf';

import {
  DigitaloceanProvider,
  Droplet,
} from './.gen/providers/digitalocean';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Configure API Token
    new DigitaloceanProvider(this, 'coscup_demo', {
      token: process.env.DO_TOKEN
    })

    // Configure Droplet
    const droplet = new Droplet(this, 'coscup_droplet', {
      name: 'COSCUP-2020-Demo',
      region: 'sgp1',
      image: 'ubuntu-18-04-x64',
      size: 's-1vcpu-1gb'
    })

    // Show outputs
    new TerraformOutput(this, 'demo_ip', {
      value: droplet.ipv4Address,
      description: 'Demo Droplet IPv4 Address'
    })

  }
}

const app = new App();
new MyStack(app, 'coscup-2020-demo');
app.synth();
