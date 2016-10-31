package br.ufrj.cos482.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.StatusDocumento;

/**
 * A DTO for the DocumentoSistema entity.
 */
public class DocumentoSistemaDTO implements Serializable {

    private Long id;

    private String tipo;

    private String formato;

    private ZonedDateTime timestampEnvio;

    private StatusDocumento status;

    private Integer escopo;

    private String caminho;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getFormato() {
        return formato;
    }

    public void setFormato(String formato) {
        this.formato = formato;
    }
    public ZonedDateTime getTimestampEnvio() {
        return timestampEnvio;
    }

    public void setTimestampEnvio(ZonedDateTime timestampEnvio) {
        this.timestampEnvio = timestampEnvio;
    }
    public StatusDocumento getStatus() {
        return status;
    }

    public void setStatus(StatusDocumento status) {
        this.status = status;
    }
    public Integer getEscopo() {
        return escopo;
    }

    public void setEscopo(Integer escopo) {
        this.escopo = escopo;
    }
    public String getCaminho() {
        return caminho;
    }

    public void setCaminho(String caminho) {
        this.caminho = caminho;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentoSistemaDTO documentoSistemaDTO = (DocumentoSistemaDTO) o;

        if ( ! Objects.equals(id, documentoSistemaDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "DocumentoSistemaDTO{" +
            "id=" + id +
            ", tipo='" + tipo + "'" +
            ", formato='" + formato + "'" +
            ", timestampEnvio='" + timestampEnvio + "'" +
            ", status='" + status + "'" +
            ", escopo='" + escopo + "'" +
            ", caminho='" + caminho + "'" +
            '}';
    }
}
