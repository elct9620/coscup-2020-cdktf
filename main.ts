import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { DigitaloceanProvider } from './.gen/providers/digitalocean';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Configure API Token
    new DigitaloceanProvider(this, 'coscup_demo', {
      token: process.env.DO_TOKEN
    })

  }
}

const app = new App();
new MyStack(app, 'coscup-2020-demo');
app.synth();
