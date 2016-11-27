package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.Funcoes;

/**
 * A LogDoSistema.
 */
@Entity
@Table(name = "log_do_sistema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LogDoSistema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "timestamp_funcao")
    private ZonedDateTime timestampFuncao;

    @Enumerated(EnumType.STRING)
    @Column(name = "funcao")
    private Funcoes funcao;

    @Column(name = "username")
    private String username;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTimestampFuncao() {
        return timestampFuncao;
    }

    public LogDoSistema timestampFuncao(ZonedDateTime timestampFuncao) {
        this.timestampFuncao = timestampFuncao;
        return this;
    }

    public void setTimestampFuncao(ZonedDateTime timestampFuncao) {
        this.timestampFuncao = timestampFuncao;
    }

    public Funcoes getFuncao() {
        return funcao;
    }

    public LogDoSistema funcao(Funcoes funcao) {
        this.funcao = funcao;
        return this;
    }

    public void setFuncao(Funcoes funcao) {
        this.funcao = funcao;
    }

    public String getUsername() {
        return username;
    }

    public LogDoSistema username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LogDoSistema logDoSistema = (LogDoSistema) o;
        if(logDoSistema.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, logDoSistema.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "LogDoSistema{" +
            "id=" + id +
            ", timestampFuncao='" + timestampFuncao + "'" +
            ", funcao='" + funcao + "'" +
            ", username='" + username + "'" +
            '}';
    }
}
