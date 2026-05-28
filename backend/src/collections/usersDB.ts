import { Schema, model } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '../interfaces/User';

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, default: 'offline' },
  authentication: {
    password: { type: String, required: true },
    login: { type: String, required: true },
  },
  socketId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date, default: Date.now }

})

userSchema.methods.comparePassword = function(password: string) {
    return new Promise((resolve, reject) => {
        compare(password, (this as any).authentication.password, (err, isMatch) => {
            if (err) return reject(err);
            resolve(isMatch);
          });
    })
  };

  userSchema.pre('save', function() {
    // eslint-disable-next-line no-invalid-this
    const user: any = this;

    return new Promise((resolve, reject) => {
        if (!user.isModified('authentication.password')) return resolve();
        if (!user.authentication) {
        return reject(new Error('no authentication info'));
        }

        genSalt(10, function(err, salt) {
            if (err) return reject(err);

            hash(user.authentication.password, salt, function(err, hash) {
                if (err) return reject(err);

                user.authentication.password = hash;
                return resolve();
            });
        });
    });
});

const userDb = model<User>('users', userSchema)

export { userDb }
