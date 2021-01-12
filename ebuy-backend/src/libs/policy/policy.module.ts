import { Module } from '@nestjs/common';
import { CaslModule } from 'src/libs/casl';

@Module({
    imports: [CaslModule]
})
export class PolicyModule {}